import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
export declare class DogsController {
    private readonly dogsService;
    constructor(dogsService: DogsService);
    create(req: any, createDogDto: CreateDogDto): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(req: any, id: string): Promise<{
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
    update(req: any, id: string, updateDogDto: UpdateDogDto): Promise<{
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
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
    addPhoto(req: any, id: string, file: Express.Multer.File): Promise<{
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
