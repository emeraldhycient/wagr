import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDogDto: CreateDogDto) {
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

  async findAll(userId: string) {
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

  async findOne(id: string, userId: string) {
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
      throw new NotFoundException('Dog not found');
    }

    if (dog.ownerId !== userId) {
      throw new ForbiddenException('You can only view your own dogs');
    }

    return dog;
  }

  async update(id: string, userId: string, updateDogDto: UpdateDogDto) {
    const dog = await this.prisma.dog.findUnique({
      where: { id },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    if (dog.ownerId !== userId) {
      throw new ForbiddenException('You can only update your own dogs');
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

  async remove(id: string, userId: string) {
    const dog = await this.prisma.dog.findUnique({
      where: { id },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    if (dog.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own dogs');
    }

    await this.prisma.dog.delete({
      where: { id },
    });

    return { message: 'Dog deleted successfully' };
  }

  async addPhoto(id: string, userId: string, photoUrl: string) {
    const dog = await this.prisma.dog.findUnique({
      where: { id },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    if (dog.ownerId !== userId) {
      throw new ForbiddenException('You can only add photos to your own dogs');
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
} 