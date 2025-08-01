import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from './dto/update-booking-status.dto';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    createServiceProvider(userId: string, createServiceProviderDto: CreateServiceProviderDto): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            profilePhoto: string;
        };
    } & {
        id: string;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        backgroundCheck: string | null;
        businessName: string;
        license: string | null;
        serviceTypes: string[];
        experience: string | null;
        certifications: string[];
        insurance: string | null;
        serviceArea: import("@prisma/client/runtime/library").JsonValue;
        availability: import("@prisma/client/runtime/library").JsonValue;
        pricing: import("@prisma/client/runtime/library").JsonValue;
        specialServices: string[];
        emergencyProcedures: string | null;
        rating: number;
        totalReviews: number;
    }>;
    findAllServiceProviders(): Promise<({
        user: {
            firstName: string;
            lastName: string;
            id: string;
            profilePhoto: string;
        };
        _count: {
            bookings: number;
        };
    } & {
        id: string;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        backgroundCheck: string | null;
        businessName: string;
        license: string | null;
        serviceTypes: string[];
        experience: string | null;
        certifications: string[];
        insurance: string | null;
        serviceArea: import("@prisma/client/runtime/library").JsonValue;
        availability: import("@prisma/client/runtime/library").JsonValue;
        pricing: import("@prisma/client/runtime/library").JsonValue;
        specialServices: string[];
        emergencyProcedures: string | null;
        rating: number;
        totalReviews: number;
    })[]>;
    findServiceProvider(id: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            profilePhoto: string;
        };
        bookings: ({
            user: {
                firstName: string;
                lastName: string;
                id: string;
            };
            dog: {
                id: string;
                name: string;
                breed: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            startTime: Date;
            endTime: Date;
            status: import("@prisma/client").$Enums.BookingStatus;
            dogId: string;
            serviceProviderId: string;
            totalPrice: number;
            notes: string | null;
        })[];
    } & {
        id: string;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        backgroundCheck: string | null;
        businessName: string;
        license: string | null;
        serviceTypes: string[];
        experience: string | null;
        certifications: string[];
        insurance: string | null;
        serviceArea: import("@prisma/client/runtime/library").JsonValue;
        availability: import("@prisma/client/runtime/library").JsonValue;
        pricing: import("@prisma/client/runtime/library").JsonValue;
        specialServices: string[];
        emergencyProcedures: string | null;
        rating: number;
        totalReviews: number;
    }>;
    updateServiceProvider(id: string, userId: string, updateServiceProviderDto: UpdateServiceProviderDto): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            profilePhoto: string;
        };
    } & {
        id: string;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        backgroundCheck: string | null;
        businessName: string;
        license: string | null;
        serviceTypes: string[];
        experience: string | null;
        certifications: string[];
        insurance: string | null;
        serviceArea: import("@prisma/client/runtime/library").JsonValue;
        availability: import("@prisma/client/runtime/library").JsonValue;
        pricing: import("@prisma/client/runtime/library").JsonValue;
        specialServices: string[];
        emergencyProcedures: string | null;
        rating: number;
        totalReviews: number;
    }>;
    createBooking(userId: string, createBookingDto: CreateBookingDto): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
        };
        dog: {
            id: string;
            name: string;
            breed: string;
        };
        serviceProvider: {
            user: {
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            id: string;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            backgroundCheck: string | null;
            businessName: string;
            license: string | null;
            serviceTypes: string[];
            experience: string | null;
            certifications: string[];
            insurance: string | null;
            serviceArea: import("@prisma/client/runtime/library").JsonValue;
            availability: import("@prisma/client/runtime/library").JsonValue;
            pricing: import("@prisma/client/runtime/library").JsonValue;
            specialServices: string[];
            emergencyProcedures: string | null;
            rating: number;
            totalReviews: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        startTime: Date;
        endTime: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        dogId: string;
        serviceProviderId: string;
        totalPrice: number;
        notes: string | null;
    }>;
    findAllBookings(userId: string): Promise<({
        user: {
            firstName: string;
            lastName: string;
            id: string;
        };
        dog: {
            id: string;
            name: string;
            breed: string;
        };
        serviceProvider: {
            user: {
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            id: string;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            backgroundCheck: string | null;
            businessName: string;
            license: string | null;
            serviceTypes: string[];
            experience: string | null;
            certifications: string[];
            insurance: string | null;
            serviceArea: import("@prisma/client/runtime/library").JsonValue;
            availability: import("@prisma/client/runtime/library").JsonValue;
            pricing: import("@prisma/client/runtime/library").JsonValue;
            specialServices: string[];
            emergencyProcedures: string | null;
            rating: number;
            totalReviews: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        startTime: Date;
        endTime: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        dogId: string;
        serviceProviderId: string;
        totalPrice: number;
        notes: string | null;
    })[]>;
    findBooking(id: string, userId: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
        };
        dog: {
            id: string;
            name: string;
            breed: string;
        };
        serviceProvider: {
            user: {
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            id: string;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            backgroundCheck: string | null;
            businessName: string;
            license: string | null;
            serviceTypes: string[];
            experience: string | null;
            certifications: string[];
            insurance: string | null;
            serviceArea: import("@prisma/client/runtime/library").JsonValue;
            availability: import("@prisma/client/runtime/library").JsonValue;
            pricing: import("@prisma/client/runtime/library").JsonValue;
            specialServices: string[];
            emergencyProcedures: string | null;
            rating: number;
            totalReviews: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        startTime: Date;
        endTime: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        dogId: string;
        serviceProviderId: string;
        totalPrice: number;
        notes: string | null;
    }>;
    updateBookingStatus(id: string, userId: string, status: BookingStatus): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
        };
        dog: {
            id: string;
            name: string;
            breed: string;
        };
        serviceProvider: {
            user: {
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            id: string;
            isVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            backgroundCheck: string | null;
            businessName: string;
            license: string | null;
            serviceTypes: string[];
            experience: string | null;
            certifications: string[];
            insurance: string | null;
            serviceArea: import("@prisma/client/runtime/library").JsonValue;
            availability: import("@prisma/client/runtime/library").JsonValue;
            pricing: import("@prisma/client/runtime/library").JsonValue;
            specialServices: string[];
            emergencyProcedures: string | null;
            rating: number;
            totalReviews: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        startTime: Date;
        endTime: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        dogId: string;
        serviceProviderId: string;
        totalPrice: number;
        notes: string | null;
    }>;
    createReview(bookingId: string, userId: string, rating: number, comment?: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        comment: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        rating: number;
        bookingId: string;
    }>;
}
