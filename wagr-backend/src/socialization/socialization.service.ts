import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class SocializationService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createEventDto: CreateEventDto) {
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

  async findOne(id: string) {
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
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: string, userId: string, updateEventDto: UpdateEventDto) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.organizerId !== userId) {
      throw new ForbiddenException('You can only update your own events');
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

  async remove(id: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.organizerId !== userId) {
      throw new ForbiddenException('You can only delete your own events');
    }

    await this.prisma.event.delete({
      where: { id },
    });

    return { message: 'Event deleted successfully' };
  }

  async joinEvent(eventId: string, dogId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Check if dog belongs to user
    const dog = await this.prisma.dog.findFirst({
      where: { id: dogId, ownerId: userId },
    });

    if (!dog) {
      throw new ForbiddenException('Dog not found or does not belong to you');
    }

    // Check if already attending
    const isAttending = event.attendees.some(dog => dog.id === dogId);
    if (isAttending) {
      throw new ForbiddenException('Dog is already attending this event');
    }

    // Check capacity
    if (event.attendees.length >= event.maxAttendees) {
      throw new ForbiddenException('Event is at full capacity');
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

  async leaveEvent(eventId: string, dogId: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Check if dog belongs to user
    const dog = await this.prisma.dog.findFirst({
      where: { id: dogId, ownerId: userId },
    });

    if (!dog) {
      throw new ForbiddenException('Dog not found or does not belong to you');
    }

    // Check if attending
    const isAttending = event.attendees.some(dog => dog.id === dogId);
    if (!isAttending) {
      throw new ForbiddenException('Dog is not attending this event');
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
} 