"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ServicesService = class ServicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createServiceProvider(userId, createServiceProviderDto) {
        const existingProvider = await this.prisma.serviceProvider.findUnique({
            where: { userId },
        });
        if (existingProvider) {
            throw new common_1.ForbiddenException('Service provider profile already exists');
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
    async findServiceProvider(id) {
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
            throw new common_1.NotFoundException('Service provider not found');
        }
        return serviceProvider;
    }
    async updateServiceProvider(id, userId, updateServiceProviderDto) {
        const serviceProvider = await this.prisma.serviceProvider.findUnique({
            where: { id },
        });
        if (!serviceProvider) {
            throw new common_1.NotFoundException('Service provider not found');
        }
        if (serviceProvider.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own service provider profile');
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
    async createBooking(userId, createBookingDto) {
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
    async findAllBookings(userId) {
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
    async findBooking(id, userId) {
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
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.userId !== userId && booking.serviceProvider.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have access to this booking');
        }
        return booking;
    }
    async updateBookingStatus(id, userId, status) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { serviceProvider: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.serviceProvider.userId !== userId) {
            throw new common_1.ForbiddenException('Only service providers can update booking status');
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
    async createReview(bookingId, userId, rating, comment) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.userId !== userId) {
            throw new common_1.ForbiddenException('You can only review your own bookings');
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
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map