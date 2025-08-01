import { PrismaService } from '../prisma/prisma.service';
import { CreateAdoptionProfileDto } from './dto/create-adoption-profile.dto';
import { UpdateAdoptionProfileDto } from './dto/update-adoption-profile.dto';
export declare class AdoptionService {
    private prisma;
    constructor(prisma: PrismaService);
    createAdoptionProfile(dogId: string, userId: string, createAdoptionProfileDto: CreateAdoptionProfileDto): Promise<{
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
        status: import("@prisma/client").$Enums.AdoptionStatus;
        dogId: string;
        story: string | null;
        specialNeeds: string[];
        adoptionFee: number | null;
    }>;
    findAllAdoptionProfiles(): Promise<({
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
        status: import("@prisma/client").$Enums.AdoptionStatus;
        dogId: string;
        story: string | null;
        specialNeeds: string[];
        adoptionFee: number | null;
    })[]>;
    findAdoptionProfile(id: string): Promise<{
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
        status: import("@prisma/client").$Enums.AdoptionStatus;
        dogId: string;
        story: string | null;
        specialNeeds: string[];
        adoptionFee: number | null;
    }>;
    updateAdoptionProfile(id: string, userId: string, updateAdoptionProfileDto: UpdateAdoptionProfileDto): Promise<{
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
        status: import("@prisma/client").$Enums.AdoptionStatus;
        dogId: string;
        story: string | null;
        specialNeeds: string[];
        adoptionFee: number | null;
    }>;
    createAdoptionApplication(adoptionProfileId: string, userId: string, message?: string): Promise<{
        adoptionProfile: {
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
            status: import("@prisma/client").$Enums.AdoptionStatus;
            dogId: string;
            story: string | null;
            specialNeeds: string[];
            adoptionFee: number | null;
        };
        applicant: {
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
        backgroundCheck: import("@prisma/client/runtime/library").JsonValue | null;
        applicantId: string;
        adoptionProfileId: string;
    }>;
    getAdoptionApplications(userId: string): Promise<({
        adoptionProfile: {
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
            status: import("@prisma/client").$Enums.AdoptionStatus;
            dogId: string;
            story: string | null;
            specialNeeds: string[];
            adoptionFee: number | null;
        };
        applicant: {
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
        backgroundCheck: import("@prisma/client/runtime/library").JsonValue | null;
        applicantId: string;
        adoptionProfileId: string;
    })[]>;
    updateAdoptionApplicationStatus(applicationId: string, userId: string, status: string): Promise<{
        adoptionProfile: {
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
            status: import("@prisma/client").$Enums.AdoptionStatus;
            dogId: string;
            story: string | null;
            specialNeeds: string[];
            adoptionFee: number | null;
        };
        applicant: {
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
        backgroundCheck: import("@prisma/client/runtime/library").JsonValue | null;
        applicantId: string;
        adoptionProfileId: string;
    }>;
}
