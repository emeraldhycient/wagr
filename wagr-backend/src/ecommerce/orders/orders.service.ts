import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { OrderStatus } from '@prisma/client';

export interface CreateOrderDto {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentIntentId?: string;
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  trackingNumber?: string;
}

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    // Validate cart
    const cartValidation = await this.cartService.validateCart(userId);
    
    if (!cartValidation.isValid) {
      throw new BadRequestException({
        message: 'Cart validation failed',
        errors: cartValidation.errors
      });
    }

    const cart = cartValidation.cart;

    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Start transaction
    return this.prisma.$transaction(async (tx) => {
      // Create order
      const orderNumber = this.generateOrderNumber();
      
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId,
          subtotal: cart.subtotal,
          tax: cart.estimatedTax,
          shipping: cart.estimatedShipping,
          total: cart.estimatedTotal,
          shippingAddress: createOrderDto.shippingAddress,
          billingAddress: createOrderDto.billingAddress || createOrderDto.shippingAddress,
          paymentMethod: createOrderDto.paymentMethod,
          paymentIntentId: createOrderDto.paymentIntentId,
          notes: createOrderDto.notes,
          items: {
            create: cart.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              total: item.total
            }))
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      // Update product stock
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return order;
    });
  }

  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 10,
    status?: OrderStatus
  ) {
    const skip = (page - 1) * limit;

    const where = {
      userId,
      ...(status && { status })
    };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      }),
      this.prisma.order.count({ where })
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string, userId?: string) {
    const where = {
      id,
      ...(userId && { userId })
    };

    const order = await this.prisma.order.findFirst({
      where,
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async findByOrderNumber(orderNumber: string, userId?: string) {
    const where = {
      orderNumber,
      ...(userId && { userId })
    };

    const order = await this.prisma.order.findFirst({
      where,
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateStatus(id: string, updateDto: UpdateOrderStatusDto) {
    const order = await this.findOne(id);

    // Validate status transition
    if (!this.isValidStatusTransition(order.status, updateDto.status)) {
      throw new BadRequestException(
        `Cannot transition from ${order.status} to ${updateDto.status}`
      );
    }

    // If cancelling or refunding, restore stock
    if (updateDto.status === 'CANCELLED' || updateDto.status === 'REFUNDED') {
      await this.restoreStock(order.id);
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        status: updateDto.status,
        ...(updateDto.trackingNumber && { trackingNumber: updateDto.trackingNumber })
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async cancelOrder(id: string, userId: string) {
    const order = await this.findOne(id, userId);

    if (!['PENDING', 'PROCESSING'].includes(order.status)) {
      throw new BadRequestException('Order cannot be cancelled');
    }

    return this.updateStatus(id, { status: 'CANCELLED' });
  }

  async getOrderStats(userId?: string) {
    const where = userId ? { userId } : {};

    const [totalOrders, ordersByStatus, totalRevenue] = await Promise.all([
      this.prisma.order.count({ where }),
      
      this.prisma.order.groupBy({
        by: ['status'],
        where,
        _count: true
      }),
      
      this.prisma.order.aggregate({
        where: {
          ...where,
          status: {
            notIn: ['CANCELLED', 'REFUNDED']
          }
        },
        _sum: {
          total: true
        }
      })
    ]);

    return {
      totalOrders,
      ordersByStatus,
      totalRevenue: totalRevenue._sum.total || 0
    };
  }

  async getAllOrders(
    page: number = 1,
    limit: number = 20,
    status?: OrderStatus,
    search?: string
  ) {
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      ...(search && {
        OR: [
          { orderNumber: { contains: search, mode: 'insensitive' as const } },
          { user: { email: { contains: search, mode: 'insensitive' as const } } },
          { user: { firstName: { contains: search, mode: 'insensitive' as const } } },
          { user: { lastName: { contains: search, mode: 'insensitive' as const } } }
        ]
      })
    };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          items: {
            include: {
              product: true
            }
          }
        }
      }),
      this.prisma.order.count({ where })
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  private isValidStatusTransition(current: OrderStatus, next: OrderStatus): boolean {
    const transitions: Record<OrderStatus, OrderStatus[]> = {
      PENDING: ['PROCESSING', 'CANCELLED'],
      PROCESSING: ['SHIPPED', 'CANCELLED'],
      SHIPPED: ['DELIVERED', 'REFUNDED'],
      DELIVERED: ['REFUNDED'],
      CANCELLED: [],
      REFUNDED: []
    };

    return transitions[current]?.includes(next) || false;
  }

  private async restoreStock(orderId: string) {
    const orderItems = await this.prisma.orderItem.findMany({
      where: { orderId }
    });

    for (const item of orderItems) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity
          }
        }
      });
    }
  }
}
