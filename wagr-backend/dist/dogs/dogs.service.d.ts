import { PrismaService } from '../prisma/prisma.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
export declare class DogsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createDogDto: CreateDogDto): Promise<{
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
    }>;
    findAll(userId: string): Promise<({
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
    })[]>;
    findOne(id: string, userId: string): Promise<{
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
    }>;
    update(id: string, userId: string, updateDogDto: UpdateDogDto): Promise<{
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
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    addPhoto(id: string, userId: string, photoUrl: string): Promise<{
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
    }>;
}
