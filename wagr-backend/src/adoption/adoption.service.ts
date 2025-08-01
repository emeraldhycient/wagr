import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdoptionProfileDto } from './dto/create-adoption-profile.dto';
import { UpdateAdoptionProfileDto } from './dto/update-adoption-profile.dto';

@Injectable()
export class AdoptionService {
  constructor(private prisma: PrismaService) {}

  async createAdoptionProfile(dogId: string, userId: string, createAdoptionProfileDto: CreateAdoptionProfileDto) {
    // Check if dog belongs to user
    const dog = await this.prisma.dog.findFirst({
      where: { id: dogId, ownerId: userId },
    });

    if (!dog) {
      throw new ForbiddenException('Dog not found or does not belong to you');
    }

    // Check if adoption profile already exists
    const existingProfile = await this.prisma.adoptionProfile.findUnique({
      where: { dogId },
    });

    if (existingProfile) {
      throw new ForbiddenException('Adoption profile already exists for this dog');
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

  async findAdoptionProfile(id: string) {
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
      throw new NotFoundException('Adoption profile not found');
    }

    return adoptionProfile;
  }

  async updateAdoptionProfile(id: string, userId: string, updateAdoptionProfileDto: UpdateAdoptionProfileDto) {
    const adoptionProfile = await this.prisma.adoptionProfile.findUnique({
      where: { id },
      include: { dog: true },
    });

    if (!adoptionProfile) {
      throw new NotFoundException('Adoption profile not found');
    }

    if (adoptionProfile.dog.ownerId !== userId) {
      throw new ForbiddenException('You can only update adoption profiles for your own dogs');
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

  async createAdoptionApplication(adoptionProfileId: string, userId: string, message?: string) {
    const adoptionProfile = await this.prisma.adoptionProfile.findUnique({
      where: { id: adoptionProfileId },
      include: { dog: true },
    });

    if (!adoptionProfile) {
      throw new NotFoundException('Adoption profile not found');
    }

    if (adoptionProfile.dog.ownerId === userId) {
      throw new ForbiddenException('You cannot apply to adopt your own dog');
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

  async getAdoptionApplications(userId: string) {
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

  async updateAdoptionApplicationStatus(applicationId: string, userId: string, status: string) {
    const adoptionApplication = await this.prisma.adoptionApplication.findUnique({
      where: { id: applicationId },
      include: {
        adoptionProfile: {
          include: { dog: true },
        },
      },
    });

    if (!adoptionApplication) {
      throw new NotFoundException('Adoption application not found');
    }

    // Only the owner of the adoption profile can update the status
    if (adoptionApplication.adoptionProfile.dog.ownerId !== userId) {
      throw new ForbiddenException('You can only update adoption applications for your own dogs');
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
} 