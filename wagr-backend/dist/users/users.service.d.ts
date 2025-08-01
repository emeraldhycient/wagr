import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        firstName: string;
        lastName: string;
        phone: string;
        userType: import("@prisma/client").$Enums.UserType;
        address: import("@prisma/client/runtime/library").JsonValue;
        id: string;
        email: string;
        isVerified: boolean;
        profilePhoto: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        firstName: string;
        lastName: string;
        phone: string | null;
        userType: import("@prisma/client").$Enums.UserType;
        address: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        email: string;
        password: string;
        isVerified: boolean;
        profilePhoto: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        firstName: string;
        lastName: string;
        phone: string;
        userType: import("@prisma/client").$Enums.UserType;
        address: import("@prisma/client/runtime/library").JsonValue;
        id: string;
        email: string;
        isVerified: boolean;
        profilePhoto: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfilePhoto(id: string, photoUrl: string): Promise<{
        id: string;
        profilePhoto: string;
    }>;
}
