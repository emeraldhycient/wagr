import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
