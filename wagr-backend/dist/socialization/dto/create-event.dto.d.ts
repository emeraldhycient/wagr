import { EventType, SocializationLevel } from '@prisma/client';
export declare class CreateEventDto {
    title: string;
    description: string;
    eventType: EventType;
    startTime: Date;
    endTime: Date;
    location: any;
    maxAttendees?: number;
    allowedBreeds?: string[];
    allowedSocializationLevels?: SocializationLevel[];
}
