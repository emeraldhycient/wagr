import { BreedingStatus } from '@prisma/client';
export declare class CreateBreedingProfileDto {
    status: BreedingStatus;
    healthScreening?: any;
    geneticTests?: any;
    breedingHistory?: any;
    preferences?: any;
    isStud?: boolean;
    isBreedingFemale?: boolean;
}
