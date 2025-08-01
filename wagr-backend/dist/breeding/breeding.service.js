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
exports.BreedingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BreedingService = class BreedingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBreedingProfile(dogId, userId, createBreedingProfileDto) {
        const dog = await this.prisma.dog.findFirst({
            where: { id: dogId, ownerId: userId },
        });
        if (!dog) {
            throw new common_1.ForbiddenException('Dog not found or does not belong to you');
        }
        const existingProfile = await this.prisma.breedingProfile.findUnique({
            where: { dogId },
        });
        if (existingProfile) {
            throw new common_1.ForbiddenException('Breeding profile already exists for this dog');
        }
        const breedingProfile = await this.prisma.breedingProfile.create({
            data: {
                ...createBreedingProfileDto,
                dogId,
            },
            include: {
                dog: {
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
        return breedingProfile;
    }
    async findAllBreedingProfiles() {
        return this.prisma.breedingProfile.findMany({
            where: { status: 'AVAILABLE' },
            include: {
                dog: {
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
    async findBreedingProfile(id) {
        const breedingProfile = await this.prisma.breedingProfile.findUnique({
            where: { id },
            include: {
                dog: {
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
        if (!breedingProfile) {
            throw new common_1.NotFoundException('Breeding profile not found');
        }
        return breedingProfile;
    }
    async updateBreedingProfile(id, userId, updateBreedingProfileDto) {
        const breedingProfile = await this.prisma.breedingProfile.findUnique({
            where: { id },
            include: { dog: true },
        });
        if (!breedingProfile) {
            throw new common_1.NotFoundException('Breeding profile not found');
        }
        if (breedingProfile.dog.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only update breeding profiles for your own dogs');
        }
        return this.prisma.breedingProfile.update({
            where: { id },
            data: updateBreedingProfileDto,
            include: {
                dog: {
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
    async createBreedingRequest(breedingProfileId, userId, message) {
        const breedingProfile = await this.prisma.breedingProfile.findUnique({
            where: { id: breedingProfileId },
            include: { dog: true },
        });
        if (!breedingProfile) {
            throw new common_1.NotFoundException('Breeding profile not found');
        }
        if (breedingProfile.dog.ownerId === userId) {
            throw new common_1.ForbiddenException('You cannot request breeding with your own dog');
        }
        const breedingRequest = await this.prisma.breedingRequest.create({
            data: {
                requesterId: userId,
                breedingProfileId,
                message,
            },
            include: {
                requester: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                breedingProfile: {
                    include: {
                        dog: {
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
                },
            },
        });
        return breedingRequest;
    }
    async getBreedingRequests(userId) {
        return this.prisma.breedingRequest.findMany({
            where: {
                OR: [
                    { requesterId: userId },
                    {
                        breedingProfile: {
                            dog: {
                                ownerId: userId,
                            },
                        },
                    },
                ],
            },
            include: {
                requester: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                breedingProfile: {
                    include: {
                        dog: {
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
                },
            },
        });
    }
    async updateBreedingRequestStatus(requestId, userId, status) {
        const breedingRequest = await this.prisma.breedingRequest.findUnique({
            where: { id: requestId },
            include: {
                breedingProfile: {
                    include: { dog: true },
                },
            },
        });
        if (!breedingRequest) {
            throw new common_1.NotFoundException('Breeding request not found');
        }
        if (breedingRequest.breedingProfile.dog.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only update breeding requests for your own dogs');
        }
        return this.prisma.breedingRequest.update({
            where: { id: requestId },
            data: { status },
            include: {
                requester: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                breedingProfile: {
                    include: {
                        dog: {
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
                },
            },
        });
    }
};
exports.BreedingService = BreedingService;
exports.BreedingService = BreedingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BreedingService);
//# sourceMappingURL=breeding.service.js.map