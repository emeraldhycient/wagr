import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
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
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
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
    uploadProfilePhoto(req: any, file: Express.Multer.File): Promise<{
        id: string;
        profilePhoto: string;
    }>;
}
