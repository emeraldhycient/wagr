"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocializationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SocializationService = class SocializationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createEventDto) {
        const event = await this.prisma.event.create({
            data: {
                ...createEventDto,
                organizerId: userId,
            },
            include: {
                organizer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                attendees: {
                    include: {
                        owner: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
        return event;
    }
    async findAll() {
        return this.prisma.event.findMany({
            where: { isActive: true },
            include: {
                organizer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                attendees: {
                    include: {
                        owner: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
            orderBy: { startTime: 'asc' },
        });
    }
    async findOne(id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                organizer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                attendees: {
                    include: {
                        owner: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async update(id, userId, updateEventDto) {
        const event = await this.prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.organizerId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own events');
        }
        return this.prisma.event.update({
            where: { id },
            data: updateEventDto,
            include: {
                organizer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                attendees: {
                    include: {
                        owner: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async remove(id, userId) {
        const event = await this.prisma.event.findUnique({
            where: { id },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.organizerId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own events');
        }
        await this.prisma.event.delete({
            where: { id },
        });
        return { message: 'Event deleted successfully' };
    }
    async joinEvent(eventId, dogId, userId) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: { attendees: true },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        const dog = await this.prisma.dog.findFirst({
            where: { id: dogId, ownerId: userId },
        });
        if (!dog) {
            throw new common_1.ForbiddenException('Dog not found or does not belong to you');
        }
        const isAttending = event.attendees.some(dog => dog.id === dogId);
        if (isAttending) {
            throw new common_1.ForbiddenException('Dog is already attending this event');
        }
        if (event.attendees.length >= event.maxAttendees) {
            throw new common_1.ForbiddenException('Event is at full capacity');
        }
        return this.prisma.event.update({
            where: { id: eventId },
            data: {
                attendees: {
                    connect: { id: dogId },
                },
            },
            include: {
                organizer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                attendees: {
                    include: {
                        owner: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async leaveEvent(eventId, dogId, userId) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: { attendees: true },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        const dog = await this.prisma.dog.findFirst({
            where: { id: dogId, ownerId: userId },
        });
        if (!dog) {
            throw new common_1.ForbiddenException('Dog not found or does not belong to you');
        }
        const isAttending = event.attendees.some(dog => dog.id === dogId);
        if (!isAttending) {
            throw new common_1.ForbiddenException('Dog is not attending this event');
        }
        return this.prisma.event.update({
            where: { id: eventId },
            data: {
                attendees: {
                    disconnect: { id: dogId },
                },
            },
            include: {
                organizer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                attendees: {
                    include: {
                        owner: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
    }
};
exports.SocializationService = SocializationService;
exports.SocializationService = SocializationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SocializationService);
//# sourceMappingURL=socialization.service.js.map