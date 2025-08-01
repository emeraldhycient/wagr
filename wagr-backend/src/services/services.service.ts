import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async createServiceProvider(userId: string, createServiceProviderDto: CreateServiceProviderDto) {
    // Check if service provider already exists
    const existingProvider = await this.prisma.serviceProvider.findUnique({
      where: { userId },
    });

    if (existingProvider) {
      throw new ForbiddenException('Service provider profile already exists');
    }

    const serviceProvider = await this.prisma.serviceProvider.create({
      data: {
        ...createServiceProviderDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
      },
    });

    return serviceProvider;
  }

  async findAllServiceProviders() {
    return this.prisma.serviceProvider.findMany({
      where: { isVerified: true },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
        _count: {
          select: {
            bookings: true,
          },
        },
      },
    });
  }

  async findServiceProvider(id: string) {
    const serviceProvider = await this.prisma.serviceProvider.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
        bookings: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            dog: {
              select: {
                id: true,
                name: true,
                breed: true,
              },
            },
          },
        },
      },
    });

    if (!serviceProvider) {
      throw new NotFoundException('Service provider not found');
    }

    return serviceProvider;
  }

  async updateServiceProvider(id: string, userId: string, updateServiceProviderDto: UpdateServiceProviderDto) {
    const serviceProvider = await this.prisma.serviceProvider.findUnique({
      where: { id },
    });

    if (!serviceProvider) {
      throw new NotFoundException('Service provider not found');
    }

    if (serviceProvider.userId !== userId) {
      throw new ForbiddenException('You can only update your own service provider profile');
    }

    return this.prisma.serviceProvider.update({
      where: { id },
      data: updateServiceProviderDto,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
      },
    });
  }

  async createBooking(userId: string, createBookingDto: CreateBookingDto) {
    const booking = await this.prisma.booking.create({
      data: {
        ...createBookingDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
          },
        },
        serviceProvider: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return booking;
  }

  async findAllBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: {
        OR: [
          { userId },
          {
            serviceProvider: {
              userId,
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
          },
        },
        serviceProvider: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: { startTime: 'desc' },
    });
  }

  async findBooking(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
          },
        },
        serviceProvider: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check if user has access to this booking
    if (booking.userId !== userId && booking.serviceProvider.userId !== userId) {
      throw new ForbiddenException('You do not have access to this booking');
    }

    return booking;
  }

  async updateBookingStatus(id: string, userId: string, status: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { serviceProvider: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Only the service provider can update booking status
    if (booking.serviceProvider.userId !== userId) {
      throw new ForbiddenException('Only service providers can update booking status');
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
          },
        },
        serviceProvider: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async createReview(bookingId: string, userId: string, rating: number, comment?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only review your own bookings');
    }

    const review = await this.prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        bookingId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return review;
  }
} 