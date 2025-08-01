import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ProductCategory } from '@prisma/client';

export interface CreateProductDto {
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  salePrice?: number;
  sku: string;
  images: string[];
  stock: number;
  tags?: string[];
  specifications?: any;
  weight?: number;
  dimensions?: any;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  isActive?: boolean;
}

export interface ProductFilterDto {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  search?: string;
  isActive?: boolean;
  inStock?: boolean;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // Check if SKU already exists
    const existingProduct = await this.prisma.product.findUnique({
      where: { sku: createProductDto.sku }
    });

    if (existingProduct) {
      throw new BadRequestException('Product with this SKU already exists');
    }

    return this.prisma.product.create({
      data: createProductDto
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 20,
    filter?: ProductFilterDto,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      ...(filter?.category && { category: filter.category }),
      ...(filter?.minPrice && { price: { gte: filter.minPrice } }),
      ...(filter?.maxPrice && { price: { lte: filter.maxPrice } }),
      ...(filter?.tags && { tags: { hasSome: filter.tags } }),
      ...(filter?.isActive !== undefined && { isActive: filter.isActive }),
      ...(filter?.inStock && { stock: { gt: 0 } }),
      ...(filter?.search && {
        OR: [
          { name: { contains: filter.search, mode: 'insensitive' } },
          { description: { contains: filter.search, mode: 'insensitive' } },
          { tags: { has: filter.search } }
        ]
      })
    };

    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      [sortBy]: sortOrder
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy
      }),
      this.prisma.product.count({ where })
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findBySku(sku: string) {
    const product = await this.prisma.product.findUnique({
      where: { sku }
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    // If updating SKU, check if new SKU already exists
    if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
      const existingProduct = await this.prisma.product.findUnique({
        where: { sku: updateProductDto.sku }
      });

      if (existingProduct) {
        throw new BadRequestException('Product with this SKU already exists');
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    // Check if product is in any active orders
    const activeOrders = await this.prisma.orderItem.count({
      where: {
        productId: id,
        order: {
          status: {
            in: ['PENDING', 'PROCESSING', 'SHIPPED']
          }
        }
      }
    });

    if (activeOrders > 0) {
      throw new BadRequestException('Cannot delete product with active orders');
    }

    return this.prisma.product.delete({
      where: { id }
    });
  }

  async updateStock(id: string, quantity: number, operation: 'add' | 'subtract' | 'set') {
    const product = await this.findOne(id);

    let newStock: number;
    switch (operation) {
      case 'add':
        newStock = product.stock + quantity;
        break;
      case 'subtract':
        newStock = product.stock - quantity;
        if (newStock < 0) {
          throw new BadRequestException('Insufficient stock');
        }
        break;
      case 'set':
        newStock = quantity;
        break;
    }

    return this.prisma.product.update({
      where: { id },
      data: { stock: newStock }
    });
  }

  async getFeaturedProducts(limit: number = 8) {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        stock: { gt: 0 }
      },
      orderBy: [
        { salePrice: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    });
  }

  async getRelatedProducts(productId: string, limit: number = 4) {
    const product = await this.findOne(productId);

    return this.prisma.product.findMany({
      where: {
        id: { not: productId },
        isActive: true,
        stock: { gt: 0 },
        OR: [
          { category: product.category },
          { tags: { hasSome: product.tags } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  async searchProducts(query: string, limit: number = 10) {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { has: query } },
          { sku: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: limit
    });
  }

  async getCategories() {
    const categories = Object.values(ProductCategory);
    
    const categoryCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await this.prisma.product.count({
          where: {
            category,
            isActive: true
          }
        });
        return { category, count };
      })
    );

    return categoryCounts.filter(c => c.count > 0);
  }

  async bulkUpdatePrices(updates: { id: string; price?: number; salePrice?: number }[]) {
    const updatePromises = updates.map(update => 
      this.prisma.product.update({
        where: { id: update.id },
        data: {
          ...(update.price !== undefined && { price: update.price }),
          ...(update.salePrice !== undefined && { salePrice: update.salePrice })
        }
      })
    );

    return Promise.all(updatePromises);
  }

  async getLowStockProducts(threshold: number = 10) {
    return this.prisma.product.findMany({
      where: {
        stock: { lte: threshold },
        isActive: true
      },
      orderBy: { stock: 'asc' }
    });
  }
}
