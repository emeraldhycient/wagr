import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserType } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalDogs,
      totalEvents,
      totalBookings,
      totalOrders,
      totalProducts,
      recentOrders,
      topProducts,
      userGrowth,
      revenue
    ] = await Promise.all([
      // Total users
      this.prisma.user.count(),
      
      // Total dogs
      this.prisma.dog.count(),
      
      // Total events
      this.prisma.event.count(),
      
      // Total bookings
      this.prisma.booking.count(),
      
      // Total orders
      this.prisma.order.count(),
      
      // Total products
      this.prisma.product.count(),
      
      // Recent orders
      this.prisma.order.findMany({
        take: 10,
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
      
      // Top selling products
      this.prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: {
          quantity: true,
          total: true
        },
        orderBy: {
          _sum: {
            quantity: 'desc'
          }
        },
        take: 5
      }),
      
      // User growth (last 30 days)
      this.getUserGrowthStats(),
      
      // Revenue stats
      this.getRevenueStats()
    ]);

    // Get product details for top products
    const topProductDetails = await this.prisma.product.findMany({
      where: {
        id: {
          in: topProducts.map(p => p.productId)
        }
      }
    });

    const topProductsWithDetails = topProducts.map(tp => {
      const product = topProductDetails.find(p => p.id === tp.productId);
      return {
        product,
        totalQuantity: tp._sum.quantity,
        totalRevenue: tp._sum.total
      };
    });

    return {
      overview: {
        totalUsers,
        totalDogs,
        totalEvents,
        totalBookings,
        totalOrders,
        totalProducts
      },
      recentOrders,
      topProducts: topProductsWithDetails,
      userGrowth,
      revenue
    };
  }

  async getUserGrowthStats() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const usersByDay = await this.prisma.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      _count: true
    });

    return usersByDay;
  }

  async getRevenueStats() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [totalRevenue, monthlyRevenue, dailyRevenue] = await Promise.all([
      // Total revenue
      this.prisma.order.aggregate({
        _sum: {
          total: true
        },
        where: {
          status: {
            notIn: ['CANCELLED', 'REFUNDED']
          }
        }
      }),
      
      // Monthly revenue
      this.prisma.order.aggregate({
        _sum: {
          total: true
        },
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          },
          status: {
            notIn: ['CANCELLED', 'REFUNDED']
          }
        }
      }),
      
      // Daily revenue breakdown
      this.prisma.$queryRaw`
        SELECT 
          DATE(created_at) as date,
          SUM(total) as revenue,
          COUNT(*) as order_count
        FROM orders
        WHERE created_at >= ${thirtyDaysAgo}
          AND status NOT IN ('CANCELLED', 'REFUNDED')
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `
    ]);

    return {
      totalRevenue: totalRevenue._sum.total || 0,
      monthlyRevenue: monthlyRevenue._sum.total || 0,
      dailyRevenue
    };
  }

  async getAllUsers(page: number = 1, limit: number = 20, search?: string) {
    const skip = (page - 1) * limit;
    
    const where = search ? {
      OR: [
        { email: { contains: search, mode: 'insensitive' as const } },
        { firstName: { contains: search, mode: 'insensitive' as const } },
        { lastName: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          dogs: true,
          orders: true,
          _count: {
            select: {
              bookings: true,
              posts: true
            }
          }
        }
      }),
      this.prisma.user.count({ where })
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async updateUserStatus(userId: string, isVerified: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isVerified }
    });
  }

  async deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId }
    });
  }

  async getSystemHealth() {
    const [
      dbConnection,
      activeUsers,
      pendingOrders,
      lowStockProducts
    ] = await Promise.all([
      // Check database connection
      this.checkDatabaseConnection(),
      
      // Active users (last 24 hours)
      this.prisma.user.count({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Pending orders
      this.prisma.order.count({
        where: {
          status: 'PENDING'
        }
      }),
      
      // Low stock products
      this.prisma.product.count({
        where: {
          stock: {
            lt: 10
          },
          isActive: true
        }
      })
    ]);

    return {
      database: dbConnection,
      activeUsers,
      pendingOrders,
      lowStockProducts,
      timestamp: new Date()
    };
  }

  async checkDatabaseConnection() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', message: 'Database connection is active' };
    } catch (error) {
      return { status: 'unhealthy', message: 'Database connection failed', error: error.message };
    }
  }

  async logAdminAction(adminId: string, action: string, entity: string, entityId?: string, details?: any) {
    return this.prisma.adminAction.create({
      data: {
        adminId,
        action,
        entity,
        entityId,
        details
      }
    });
  }

  async getAdminActions(page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;

    const [actions, total] = await Promise.all([
      this.prisma.adminAction.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true
            }
          }
        }
      }),
      this.prisma.adminAction.count()
    ]);

    return {
      actions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getAnalytics(startDate?: Date, endDate?: Date) {
    const dateFilter = {
      ...(startDate && { gte: startDate }),
      ...(endDate && { lte: endDate })
    };

    const [
      userAnalytics,
      orderAnalytics,
      serviceAnalytics,
      adoptionAnalytics
    ] = await Promise.all([
      // User analytics
      this.getUserAnalytics(dateFilter),
      
      // Order analytics
      this.getOrderAnalytics(dateFilter),
      
      // Service analytics
      this.getServiceAnalytics(dateFilter),
      
      // Adoption analytics
      this.getAdoptionAnalytics(dateFilter)
    ]);

    return {
      userAnalytics,
      orderAnalytics,
      serviceAnalytics,
      adoptionAnalytics
    };
  }

  private async getUserAnalytics(dateFilter: any) {
    const [newUsers, usersByType, activeUsers] = await Promise.all([
      // New users
      this.prisma.user.count({
        where: {
          createdAt: dateFilter
        }
      }),
      
      // Users by type
      this.prisma.user.groupBy({
        by: ['userType'],
        _count: true,
        where: {
          createdAt: dateFilter
        }
      }),
      
      // Active users
      this.prisma.user.count({
        where: {
          updatedAt: dateFilter
        }
      })
    ]);

    return {
      newUsers,
      usersByType,
      activeUsers
    };
  }

  private async getOrderAnalytics(dateFilter: any) {
    const [totalOrders, ordersByStatus, averageOrderValue] = await Promise.all([
      // Total orders
      this.prisma.order.count({
        where: {
          createdAt: dateFilter
        }
      }),
      
      // Orders by status
      this.prisma.order.groupBy({
        by: ['status'],
        _count: true,
        where: {
          createdAt: dateFilter
        }
      }),
      
      // Average order value
      this.prisma.order.aggregate({
        _avg: {
          total: true
        },
        where: {
          createdAt: dateFilter,
          status: {
            notIn: ['CANCELLED', 'REFUNDED']
          }
        }
      })
    ]);

    return {
      totalOrders,
      ordersByStatus,
      averageOrderValue: averageOrderValue._avg.total || 0
    };
  }

  private async getServiceAnalytics(dateFilter: any) {
    const [totalBookings, bookingsByStatus, topProviders] = await Promise.all([
      // Total bookings
      this.prisma.booking.count({
        where: {
          createdAt: dateFilter
        }
      }),
      
      // Bookings by status
      this.prisma.booking.groupBy({
        by: ['status'],
        _count: true,
        where: {
          createdAt: dateFilter
        }
      }),
      
      // Top service providers
      this.prisma.booking.groupBy({
        by: ['serviceProviderId'],
        _count: true,
        where: {
          createdAt: dateFilter
        },
        orderBy: {
          _count: {
            serviceProviderId: 'desc'
          }
        },
        take: 5
      })
    ]);

    return {
      totalBookings,
      bookingsByStatus,
      topProviders
    };
  }

  private async getAdoptionAnalytics(dateFilter: any) {
    const [totalAdoptions, adoptionsByStatus, successRate] = await Promise.all([
      // Total adoption applications
      this.prisma.adoptionApplication.count({
        where: {
          createdAt: dateFilter
        }
      }),
      
      // Applications by status
      this.prisma.adoptionApplication.groupBy({
        by: ['status'],
        _count: true,
        where: {
          createdAt: dateFilter
        }
      }),
      
      // Success rate
      this.calculateAdoptionSuccessRate(dateFilter)
    ]);

    return {
      totalAdoptions,
      adoptionsByStatus,
      successRate
    };
  }

  private async calculateAdoptionSuccessRate(dateFilter: any) {
    const [total, successful] = await Promise.all([
      this.prisma.adoptionApplication.count({
        where: {
          createdAt: dateFilter
        }
      }),
      this.prisma.adoptionApplication.count({
        where: {
          createdAt: dateFilter,
          status: 'APPROVED'
        }
      })
    ]);

    return total > 0 ? (successful / total) * 100 : 0;
  }
}
