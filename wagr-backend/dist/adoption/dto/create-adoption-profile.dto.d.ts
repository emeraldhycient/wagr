import { AdoptionStatus } from '@prisma/client';
export declare class CreateAdoptionProfileDto {
    status: AdoptionStatus;
    story?: string;
    specialNeeds?: string[];
    adoptionFee?: number;
}
