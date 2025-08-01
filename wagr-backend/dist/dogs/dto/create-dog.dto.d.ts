import { Gender, SocializationLevel } from '@prisma/client';
export declare class CreateDogDto {
    name: string;
    breed: string;
    birthDate: Date;
    gender: Gender;
    medicalConditions?: string[];
    furType: string;
    furColor: string;
    socializationLevel: SocializationLevel;
    interests?: string[];
    photos?: string[];
    isAvailableForBreeding?: boolean;
    isForAdoption?: boolean;
    weight?: number;
    height?: number;
    description?: string;
}
