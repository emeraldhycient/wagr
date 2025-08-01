import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private usersService;
    private jwtService;
    constructor(prisma: PrismaService, usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            firstName: string;
            lastName: string;
            userType: import("@prisma/client").$Enums.UserType;
            id: string;
            email: string;
            isVerified: boolean;
            createdAt: Date;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            userType: import("@prisma/client").$Enums.UserType;
            isVerified: boolean;
        };
        token: string;
    }>;
    validateUser(userId: string): Promise<{
        firstName: string;
        lastName: string;
        userType: import("@prisma/client").$Enums.UserType;
        id: string;
        email: string;
        isVerified: boolean;
    }>;
    validateUserByCredentials(email: string, password: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        userType: import("@prisma/client").$Enums.UserType;
        isVerified: boolean;
    }>;
}
