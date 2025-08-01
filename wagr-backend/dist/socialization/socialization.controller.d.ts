import { SocializationService } from './socialization.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
export declare class SocializationController {
    private readonly socializationService;
    constructor(socializationService: SocializationService);
    createEvent(req: any, createEventDto: CreateEventDto): Promise<{
        organizer: {
            firstName: string;
            lastName: string;
            id: string;
        };
        attendees: ({
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
        })[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        eventType: import("@prisma/client").$Enums.EventType;
        startTime: Date;
        endTime: Date;
        location: import("@prisma/client/runtime/library").JsonValue;
        maxAttendees: number;
        allowedBreeds: string[];
        allowedSocializationLevels: import("@prisma/client").$Enums.SocializationLevel[];
        organizerId: string;
    }>;
    findAllEvents(): Promise<({
        organizer: {
            firstName: string;
            lastName: string;
            id: string;
        };
        attendees: ({
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
        })[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        eventType: import("@prisma/client").$Enums.EventType;
        startTime: Date;
        endTime: Date;
        location: import("@prisma/client/runtime/library").JsonValue;
        maxAttendees: number;
        allowedBreeds: string[];
        allowedSocializationLevels: import("@prisma/client").$Enums.SocializationLevel[];
        organizerId: string;
    })[]>;
    findOneEvent(id: string): Promise<{
        organizer: {
            firstName: string;
            lastName: string;
            id: string;
        };
        attendees: ({
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
        })[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        eventType: import("@prisma/client").$Enums.EventType;
        startTime: Date;
        endTime: Date;
        location: import("@prisma/client/runtime/library").JsonValue;
        maxAttendees: number;
        allowedBreeds: string[];
        allowedSocializationLevels: import("@prisma/client").$Enums.SocializationLevel[];
        organizerId: string;
    }>;
    updateEvent(req: any, id: string, updateEventDto: UpdateEventDto): Promise<{
        organizer: {
            firstName: string;
            lastName: string;
            id: string;
        };
        attendees: ({
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
        })[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        eventType: import("@prisma/client").$Enums.EventType;
        startTime: Date;
        endTime: Date;
        location: import("@prisma/client/runtime/library").JsonValue;
        maxAttendees: number;
        allowedBreeds: string[];
        allowedSocializationLevels: import("@prisma/client").$Enums.SocializationLevel[];
        organizerId: string;
    }>;
    removeEvent(req: any, id: string): Promise<{
        message: string;
    }>;
    joinEvent(req: any, eventId: string, body: {
        dogId: string;
    }): Promise<{
        organizer: {
            firstName: string;
            lastName: string;
            id: string;
        };
        attendees: ({
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
        })[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        eventType: import("@prisma/client").$Enums.EventType;
        startTime: Date;
        endTime: Date;
        location: import("@prisma/client/runtime/library").JsonValue;
        maxAttendees: number;
        allowedBreeds: string[];
        allowedSocializationLevels: import("@prisma/client").$Enums.SocializationLevel[];
        organizerId: string;
    }>;
    leaveEvent(req: any, eventId: string, body: {
        dogId: string;
    }): Promise<{
        organizer: {
            firstName: string;
            lastName: string;
            id: string;
        };
        attendees: ({
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
        })[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        eventType: import("@prisma/client").$Enums.EventType;
        startTime: Date;
        endTime: Date;
        location: import("@prisma/client/runtime/library").JsonValue;
        maxAttendees: number;
        allowedBreeds: string[];
        allowedSocializationLevels: import("@prisma/client").$Enums.SocializationLevel[];
        organizerId: string;
    }>;
}
