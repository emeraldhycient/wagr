import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminRole } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalDogs,
      totalPosts,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentUsers,
      recentOrders,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.dog.count(),
      this.prisma.post.count(),
      this.prisma.product?.count() || 0,
      this.prisma.order?.count() || 0,
      this.prisma.order?.aggregate({
        _sum: { totalAmount: true },
      }).then(result => result._sum.totalAmount || 0),
      this.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
        },
      }),
      this.prisma.order?.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }) || [],
    ]);

    return {
      stats: {
        totalUsers,
        totalDogs,
        totalPosts,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
      recentActivity: {
        recentUsers,
        recentOrders,
      },
    };
  }

  async getAllUsers(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          dogs: true,
          _count: {
            select: {
              posts: true,
              events: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        dogs: true,
        posts: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        events: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        serviceProvider: true,
        orders: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deactivateUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: { isVerified: false },
    });
  }

  async getAllPosts(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      }),
      this.prisma.post.count(),
    ]);

    return {
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deletePost(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.post.delete({
      where: { id },
    });
  }

  async getAnalytics(startDate?: Date, endDate?: Date) {
    const dateFilter = startDate && endDate 
      ? {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        }
      : {};

    const [
      userGrowth,
      postActivity,
      orderActivity,
    ] = await Promise.all([
      this.prisma.user.groupBy({
        by: ['createdAt'],
        where: dateFilter,
        _count: true,
      }),
      this.prisma.post.groupBy({
        by: ['createdAt'],
        where: dateFilter,
        _count: true,
      }),
      this.prisma.order?.groupBy({
        by: ['createdAt'],
        where: dateFilter,
        _count: true,
        _sum: { totalAmount: true },
      }) || [],
    ]);

    return {
      userGrowth,
      postActivity,
      orderActivity,
    };
  }

  async logAction(adminId: string, action: string, entity: string, entityId?: string, oldValues?: any, newValues?: any) {
    return this.prisma.auditLog.create({
      data: {
        adminId,
        action,
        entity,
        entityId,
        oldValues,
        newValues,
      },
    });
  }
}