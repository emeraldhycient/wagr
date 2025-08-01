import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SocializationService } from './socialization.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@ApiTags('Socialization')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('socialization')
export class SocializationController {
  constructor(private readonly socializationService: SocializationService) {}

  @Post('events')
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  async createEvent(@Request() req, @Body() createEventDto: CreateEventDto) {
    return this.socializationService.create(req.user.id, createEventDto);
  }

  @Get('events')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'Events retrieved successfully' })
  async findAllEvents() {
    return this.socializationService.findAll();
  }

  @Get('events/:id')
  @ApiOperation({ summary: 'Get a specific event' })
  @ApiResponse({ status: 200, description: 'Event retrieved successfully' })
  async findOneEvent(@Param('id') id: string) {
    return this.socializationService.findOne(id);
  }

  @Put('events/:id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  async updateEvent(@Request() req, @Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.socializationService.update(id, req.user.id, updateEventDto);
  }

  @Delete('events/:id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  async removeEvent(@Request() req, @Param('id') id: string) {
    return this.socializationService.remove(id, req.user.id);
  }

  @Post('events/:id/join')
  @ApiOperation({ summary: 'Join an event with a dog' })
  @ApiResponse({ status: 200, description: 'Joined event successfully' })
  async joinEvent(@Request() req, @Param('id') eventId: string, @Body() body: { dogId: string }) {
    return this.socializationService.joinEvent(eventId, body.dogId, req.user.id);
  }

  @Post('events/:id/leave')
  @ApiOperation({ summary: 'Leave an event with a dog' })
  @ApiResponse({ status: 200, description: 'Left event successfully' })
  async leaveEvent(@Request() req, @Param('id') eventId: string, @Body() body: { dogId: string }) {
    return this.socializationService.leaveEvent(eventId, body.dogId, req.user.id);
  }
} 