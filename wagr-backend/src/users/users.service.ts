import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        userType: true,
        address: true,
        isVerified: true,
        profilePhoto: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        userType: true,
        address: true,
        isVerified: true,
        profilePhoto: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async updateProfilePhoto(id: string, photoUrl: string) {
    return this.prisma.user.update({
      where: { id },
      data: { profilePhoto: photoUrl },
      select: {
        id: true,
        profilePhoto: true,
      },
    });
  }
} 