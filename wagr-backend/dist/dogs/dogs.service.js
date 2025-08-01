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
exports.DogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DogsService = class DogsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createDogDto) {
        const dog = await this.prisma.dog.create({
            data: {
                ...createDogDto,
                ownerId: userId,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        return dog;
    }
    async findAll(userId) {
        return this.prisma.dog.findMany({
            where: { ownerId: userId },
            include: {
                owner: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }
    async findOne(id, userId) {
        const dog = await this.prisma.dog.findUnique({
            where: { id },
            include: {
                owner: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        if (!dog) {
            throw new common_1.NotFoundException('Dog not found');
        }
        if (dog.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only view your own dogs');
        }
        return dog;
    }
    async update(id, userId, updateDogDto) {
        const dog = await this.prisma.dog.findUnique({
            where: { id },
        });
        if (!dog) {
            throw new common_1.NotFoundException('Dog not found');
        }
        if (dog.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own dogs');
        }
        return this.prisma.dog.update({
            where: { id },
            data: updateDogDto,
            include: {
                owner: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }
    async remove(id, userId) {
        const dog = await this.prisma.dog.findUnique({
            where: { id },
        });
        if (!dog) {
            throw new common_1.NotFoundException('Dog not found');
        }
        if (dog.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own dogs');
        }
        await this.prisma.dog.delete({
            where: { id },
        });
        return { message: 'Dog deleted successfully' };
    }
    async addPhoto(id, userId, photoUrl) {
        const dog = await this.prisma.dog.findUnique({
            where: { id },
        });
        if (!dog) {
            throw new common_1.NotFoundException('Dog not found');
        }
        if (dog.ownerId !== userId) {
            throw new common_1.ForbiddenException('You can only add photos to your own dogs');
        }
        return this.prisma.dog.update({
            where: { id },
            data: {
                photos: {
                    push: photoUrl,
                },
            },
        });
    }
};
exports.DogsService = DogsService;
exports.DogsService = DogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DogsService);
//# sourceMappingURL=dogs.service.js.map