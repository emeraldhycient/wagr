import { PrismaService } from '../prisma/prisma.service';
import { CreateBreedingProfileDto } from './dto/create-breeding-profile.dto';
import { UpdateBreedingProfileDto } from './dto/update-breeding-profile.dto';
export declare class BreedingService {
    private prisma;
    constructor(prisma: PrismaService);
    createBreedingProfile(dogId: string, userId: string, createBreedingProfileDto: CreateBreedingProfileDto): Promise<{
        dog: {
            owner: {
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            breed: string;
            birthDate: Date;
            gender: import("@prisma/client").$Enums.Gender;
            medicalConditions: string[];
            furType: string;
            furColor: string;
            socializationLevel: import("@prisma/client").$Enums.SocializationLevel;
            interests: string[];
            photos: string[];
            isAvailableForBreeding: boolean;
            isForAdoption: boolean;
            weight: number | null;
            height: number | null;
            vaccinations: import("@prisma/client/runtime/library").JsonValue | null;
            isActive: boolean;
            ownerId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BreedingStatus;
        healthScreening: import("@prisma/client/runtime/library").JsonValue | null;
        geneticTests: import("@prisma/client/runtime/library").JsonValue | null;
        breedingHistory: import("@prisma/client/runtime/library").JsonValue | null;
        preferences: import("@prisma/client/runtime/library").JsonValue | null;
        isStud: boolean;
        isBreedingFemale: boolean;
        dogId: string;
    }>;
    findAllBreedingProfiles(): Promise<({
        dog: {
            owner: {
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            breed: string;
            birthDate: Date;
            gender: import("@prisma/client").$Enums.Gender;
            medicalConditions: string[];
            furType: string;
            furColor: string;
            socializationLevel: import("@prisma/client").$Enums.SocializationLevel;
            interests: string[];
            photos: string[];
            isAvailableForBreeding: boolean;
            isForAdoption: boolean;
            weight: number | null;
            height: number | null;
            vaccinations: import("@prisma/client/runtime/library").JsonValue | null;
            isActive: boolean;
            ownerId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BreedingStatus;
        healthScreening: import("@prisma/client/runtime/library").JsonValue | null;
        geneticTests: import("@prisma/client/runtime/library").JsonValue | null;
        breedingHistory: import("@prisma/client/runtime/library").JsonValue | null;
        preferences: import("@prisma/client/runtime/library").JsonValue | null;
        isStud: boolean;
        isBreedingFemale: boolean;
        dogId: string;
    })[]>;
    findBreedingProfile(id: string): Promise<{
        dog: {
            owner: {
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            breed: string;
            birthDate: Date;
            gender: import("@prisma/client").$Enums.Gender;
            medicalConditions: string[];
            furType: string;
            furColor: string;
            socializationLevel: import("@prisma/client").$Enums.SocializationLevel;
            interests: string[];
            photos: string[];
            isAvailableForBreeding: boolean;
            isForAdoption: boolean;
            weight: number | null;
            height: number | null;
            vaccinations: import("@prisma/client/runtime/library").JsonValue | null;
            isActive: boolean;
            ownerId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BreedingStatus;
        healthScreening: import("@prisma/client/runtime/library").JsonValue | null;
        geneticTests: import("@prisma/client/runtime/library").JsonValue | null;
        breedingHistory: import("@prisma/client/runtime/library").JsonValue | null;
        preferences: import("@prisma/client/runtime/library").JsonValue | null;
        isStud: boolean;
        isBreedingFemale: boolean;
        dogId: string;
    }>;
    updateBreedingProfile(id: string, userId: string, updateBreedingProfileDto: UpdateBreedingProfileDto): Promise<{
        dog: {
            owner: {
                firstName: string;
                lastName: string;
                id: string;
            };
        } & {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            breed: string;
            birthDate: Date;
            gender: import("@prisma/client").$Enums.Gender;
            medicalConditions: string[];
            furType: string;
            furColor: string;
            socializationLevel: import("@prisma/client").$Enums.SocializationLevel;
            interests: string[];
            photos: string[];
            isAvailableForBreeding: boolean;
            isForAdoption: boolean;
            weight: number | null;
            height: number | null;
            vaccinations: import("@prisma/client/runtime/library").JsonValue | null;
            isActive: boolean;
            ownerId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BreedingStatus;
        healthScreening: import("@prisma/client/runtime/library").JsonValue | null;
        geneticTests: import("@prisma/client/runtime/library").JsonValue | null;
        breedingHistory: import("@prisma/client/runtime/library").JsonValue | null;
        preferences: import("@prisma/client/runtime/library").JsonValue | null;
        isStud: boolean;
        isBreedingFemale: boolean;
        dogId: string;
    }>;
    createBreedingRequest(breedingProfileId: string, userId: string, message?: string): Promise<{
        breedingProfile: {
            dog: {
                owner: {
                    firstName: string;
                    lastName: string;
                    id: string;
                };
            } & {
                description: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                breed: string;
                birthDate: Date;
                gender: import("@prisma/client").$Enums.Gender;
                medicalConditions: string[];
                furType: string;
                furColor: string;
                socializationLevel: import("@prisma/client").$Enums.SocializationLevel;
                interests: string[];
                photos: string[];
                isAvailableForBreeding: boolean;
                isForAdoption: boolean;
                weight: number | null;
                height: number | null;
                vaccinations: import("@prisma/client/runtime/library").JsonValue | null;
                isActive: boolean;
                ownerId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.BreedingStatus;
            healthScreening: import("@prisma/client/runtime/library").JsonValue | null;
            geneticTests: import("@prisma/client/runtime/library").JsonValue | null;
            breedingHistory: import("@prisma/client/runtime/library").JsonValue | null;
            preferences: import("@prisma/client/runtime/library").JsonValue | null;
            isStud: boolean;
            isBreedingFemale: boolean;
            dogId: string;
        };
        requester: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string | null;
        requesterId: string;
        breedingProfileId: string;
    }>;
    getBreedingRequests(userId: string): Promise<({
        breedingProfile: {
            dog: {
                owner: {
                    firstName: string;
                    lastName: string;
                    id: string;
                };
            } & {
                description: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                breed: string;
                birthDate: Date;
                gender: import("@prisma/client").$Enums.Gender;
                medicalConditions: string[];
                furType: string;
                furColor: string;
                socializationLevel: import("@prisma/client").$Enums.SocializationLevel;
                interests: string[];
                photos: string[];
                isAvailableForBreeding: boolean;
                isForAdoption: boolean;
                weight: number | null;
                height: number | null;
                vaccinations: import("@prisma/client/runtime/library").JsonValue | null;
                isActive: boolean;
                ownerId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.BreedingStatus;
            healthScreening: import("@prisma/client/runtime/library").JsonValue | null;
            geneticTests: import("@prisma/client/runtime/library").JsonValue | null;
            breedingHistory: import("@prisma/client/runtime/library").JsonValue | null;
            preferences: import("@prisma/client/runtime/library").JsonValue | null;
            isStud: boolean;
            isBreedingFemale: boolean;
            dogId: string;
        };
        requester: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string | null;
        requesterId: string;
        breedingProfileId: string;
    })[]>;
    updateBreedingRequestStatus(requestId: string, userId: string, status: string): Promise<{
        breedingProfile: {
            dog: {
                owner: {
                    firstName: string;
                    lastName: string;
                    id: string;
                };
            } & {
                description: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                breed: string;
                birthDate: Date;
                gender: import("@prisma/client").$Enums.Gender;
                medicalConditions: string[];
                furType: string;
                furColor: string;
                socializationLevel: import("@prisma/client").$Enums.SocializationLevel;
                interests: string[];
                photos: string[];
                isAvailableForBreeding: boolean;
                isForAdoption: boolean;
                weight: number | null;
                height: number | null;
                vaccinations: import("@prisma/client/runtime/library").JsonValue | null;
                isActive: boolean;
                ownerId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.BreedingStatus;
            healthScreening: import("@prisma/client/runtime/library").JsonValue | null;
            geneticTests: import("@prisma/client/runtime/library").JsonValue | null;
            breedingHistory: import("@prisma/client/runtime/library").JsonValue | null;
            preferences: import("@prisma/client/runtime/library").JsonValue | null;
            isStud: boolean;
            isBreedingFemale: boolean;
            dogId: string;
        };
        requester: {
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string | null;
        requesterId: string;
        breedingProfileId: string;
    }>;
}
