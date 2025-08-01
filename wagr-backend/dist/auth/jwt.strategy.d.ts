import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private authService;
    private readonly logger;
    constructor(configService: ConfigService, authService: AuthService);
    validate(payload: any): Promise<{
        firstName: string;
        lastName: string;
        userType: import("@prisma/client").$Enums.UserType;
        id: string;
        email: string;
        isVerified: boolean;
    }>;
}
export {};
