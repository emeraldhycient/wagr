import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBreedingProfileDto } from './dto/create-breeding-profile.dto';
import { UpdateBreedingProfileDto } from './dto/update-breeding-profile.dto';

@Injectable()
export class BreedingService {
  constructor(private prisma: PrismaService) {}

  async createBreedingProfile(dogId: string, userId: string, createBreedingProfileDto: CreateBreedingProfileDto) {
    // Check if dog belongs to user
    const dog = await this.prisma.dog.findFirst({
      where: { id: dogId, ownerId: userId },
    });

    if (!dog) {
      throw new ForbiddenException('Dog not found or does not belong to you');
    }

    // Check if breeding profile already exists
    const existingProfile = await this.prisma.breedingProfile.findUnique({
      where: { dogId },
    });

    if (existingProfile) {
      throw new ForbiddenException('Breeding profile already exists for this dog');
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

  async findBreedingProfile(id: string) {
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
      throw new NotFoundException('Breeding profile not found');
    }

    return breedingProfile;
  }

  async updateBreedingProfile(id: string, userId: string, updateBreedingProfileDto: UpdateBreedingProfileDto) {
    const breedingProfile = await this.prisma.breedingProfile.findUnique({
      where: { id },
      include: { dog: true },
    });

    if (!breedingProfile) {
      throw new NotFoundException('Breeding profile not found');
    }

    if (breedingProfile.dog.ownerId !== userId) {
      throw new ForbiddenException('You can only update breeding profiles for your own dogs');
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

  async createBreedingRequest(breedingProfileId: string, userId: string, message?: string) {
    const breedingProfile = await this.prisma.breedingProfile.findUnique({
      where: { id: breedingProfileId },
      include: { dog: true },
    });

    if (!breedingProfile) {
      throw new NotFoundException('Breeding profile not found');
    }

    if (breedingProfile.dog.ownerId === userId) {
      throw new ForbiddenException('You cannot request breeding with your own dog');
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

  async getBreedingRequests(userId: string) {
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

  async updateBreedingRequestStatus(requestId: string, userId: string, status: string) {
    const breedingRequest = await this.prisma.breedingRequest.findUnique({
      where: { id: requestId },
      include: {
        breedingProfile: {
          include: { dog: true },
        },
      },
    });

    if (!breedingRequest) {
      throw new NotFoundException('Breeding request not found');
    }

    // Only the owner of the breeding profile can update the status
    if (breedingRequest.breedingProfile.dog.ownerId !== userId) {
      throw new ForbiddenException('You can only update breeding requests for your own dogs');
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
} 