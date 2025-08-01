import { UserType } from '@prisma/client';
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    phone?: string;
    userType?: UserType;
    address?: any;
}
