import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface AddToCartDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });
    }

    return this.calculateCartTotals(cart);
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;

    // Validate product exists and has sufficient stock
    const product = await this.prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!product.isActive) {
      throw new BadRequestException('Product is not available');
    }

    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient stock available');
    }

    // Get or create cart
    const cart = await this.getOrCreateCart(userId);

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    });

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.stock < newQuantity) {
        throw new BadRequestException('Insufficient stock available');
      }

      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity }
      });
    } else {
      // Create new cart item
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      });
    }

    return this.getOrCreateCart(userId);
  }

  async updateCartItem(userId: string, itemId: string, updateDto: UpdateCartItemDto) {
    const cart = await this.getOrCreateCart(userId);
    
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId: cart.id
      },
      include: {
        product: true
      }
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (updateDto.quantity <= 0) {
      // Remove item if quantity is 0 or less
      await this.prisma.cartItem.delete({
        where: { id: itemId }
      });
    } else {
      // Check stock availability
      if (cartItem.product.stock < updateDto.quantity) {
        throw new BadRequestException('Insufficient stock available');
      }

      await this.prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity: updateDto.quantity }
      });
    }

    return this.getOrCreateCart(userId);
  }

  async removeFromCart(userId: string, itemId: string) {
    const cart = await this.getOrCreateCart(userId);
    
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cartId: cart.id
      }
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({
      where: { id: itemId }
    });

    return this.getOrCreateCart(userId);
  }

  async clearCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return this.getOrCreateCart(userId);
  }

  async validateCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const item of cart.items) {
      const product = item.product;

      if (!product.isActive) {
        errors.push(`${product.name} is no longer available`);
      }

      if (product.stock < item.quantity) {
        if (product.stock === 0) {
          errors.push(`${product.name} is out of stock`);
        } else {
          warnings.push(`Only ${product.stock} units of ${product.name} are available`);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      cart: this.calculateCartTotals(cart)
    };
  }

  async getCartSummary(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    return {
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: cart.subtotal,
      cartId: cart.id
    };
  }

  private calculateCartTotals(cart: any) {
    let subtotal = 0;
    let totalSavings = 0;

    const itemsWithTotals = cart.items.map((item: any) => {
      const price = item.product.salePrice || item.product.price;
      const originalPrice = item.product.price;
      const itemTotal = price * item.quantity;
      const itemSavings = (originalPrice - price) * item.quantity;

      subtotal += itemTotal;
      totalSavings += itemSavings;

      return {
        ...item,
        price,
        originalPrice,
        total: itemTotal,
        savings: itemSavings
      };
    });

    return {
      ...cart,
      items: itemsWithTotals,
      subtotal,
      totalSavings,
      estimatedTax: subtotal * 0.08, // 8% tax estimate
      estimatedShipping: subtotal > 50 ? 0 : 5.99, // Free shipping over $50
      estimatedTotal: subtotal + (subtotal * 0.08) + (subtotal > 50 ? 0 : 5.99)
    };
  }

  async mergeGuestCart(userId: string, guestCartItems: AddToCartDto[]) {
    for (const item of guestCartItems) {
      try {
        await this.addToCart(userId, item);
      } catch (error) {
        // Continue with other items if one fails
        console.error(`Failed to add item to cart: ${error.message}`);
      }
    }

    return this.getOrCreateCart(userId);
  }
}
