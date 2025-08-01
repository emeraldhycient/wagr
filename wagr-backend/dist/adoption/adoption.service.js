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
exports.AdoptionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdoptionService = class AdoptionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAdoptionProfile(dogId, userId, createAdoptionProfileDto) {
        const dog = await this.prisma.dog.findFirst({
            where: { id: dogId, ownerId: userId },
        });
        if (!dog) {
            throw new common_1.ForbiddenException('Dog not found or does not belong to you');
        }
        const existingProfile = await this.prisma.adoptionProfile.findUnique({
            where: { dogId },
        });
        if (existingProfile) {
            throw new common_1.ForbiddenException('Adoption profile already exists for this dog');
        }
        const adoptionProfile = await this.prisma.adoptionProfile.create({
            data: {
                ...createAdoptionProfileDto,
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
        return adoptionProfile;
    }
    async findAllAdoptionProfiles() {
        return this.prisma.adoptionProfile.findMany({
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
    async findAdoptionProfile(id) {
        const adoptionProfile = await this.prisma.adoptionProfile.findUnique({
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
        if (!adoptionProfile) {
            throw new common_1.NotFoundException('Adoption profile not found');
        }
        return adoptionProfile;
    }
    async updateAdoptionProfile(id, userId, updateAdoptionProfileDto) {
        const adoptionProfile = await this.prisma.adoptionProfile.findUnique({
            where: { id },
            include: { dog: true },
        });
        if (!adoptionProfile) {
            throw new common_1.NotFoundException('Adoption profile not found');
        }
        if (adoptionProfile.dog.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only update adoption profiles for your own dogs');
        }
        return this.prisma.adoptionProfile.update({
            where: { id },
            data: updateAdoptionProfileDto,
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
    async createAdoptionApplication(adoptionProfileId, userId, message) {
        const adoptionProfile = await this.prisma.adoptionProfile.findUnique({
            where: { id: adoptionProfileId },
            include: { dog: true },
        });
        if (!adoptionProfile) {
            throw new common_1.NotFoundException('Adoption profile not found');
        }
        if (adoptionProfile.dog.ownerId === userId) {
            throw new common_1.ForbiddenException('You cannot apply to adopt your own dog');
        }
        const adoptionApplication = await this.prisma.adoptionApplication.create({
            data: {
                applicantId: userId,
                adoptionProfileId,
                message,
            },
            include: {
                applicant: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                adoptionProfile: {
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
        return adoptionApplication;
    }
    async getAdoptionApplications(userId) {
        return this.prisma.adoptionApplication.findMany({
            where: {
                OR: [
                    { applicantId: userId },
                    {
                        adoptionProfile: {
                            dog: {
                                ownerId: userId,
                            },
                        },
                    },
                ],
            },
            include: {
                applicant: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                adoptionProfile: {
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
    async updateAdoptionApplicationStatus(applicationId, userId, status) {
        const adoptionApplication = await this.prisma.adoptionApplication.findUnique({
            where: { id: applicationId },
            include: {
                adoptionProfile: {
                    include: { dog: true },
                },
            },
        });
        if (!adoptionApplication) {
            throw new common_1.NotFoundException('Adoption application not found');
        }
        if (adoptionApplication.adoptionProfile.dog.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only update adoption applications for your own dogs');
        }
        return this.prisma.adoptionApplication.update({
            where: { id: applicationId },
            data: { status },
            include: {
                applicant: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                adoptionProfile: {
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
exports.AdoptionService = AdoptionService;
exports.AdoptionService = AdoptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdoptionService);
//# sourceMappingURL=adoption.service.js.map