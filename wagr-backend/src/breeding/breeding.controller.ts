import { Controller, Get, Post, Body, Put, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BreedingService } from './breeding.service';
import { CreateBreedingProfileDto } from './dto/create-breeding-profile.dto';
import { UpdateBreedingProfileDto } from './dto/update-breeding-profile.dto';

@ApiTags('Breeding')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('breeding')
export class BreedingController {
  constructor(private readonly breedingService: BreedingService) {}

  @Post('profiles/:dogId')
  @ApiOperation({ summary: 'Create a breeding profile for a dog' })
  @ApiResponse({ status: 201, description: 'Breeding profile created successfully' })
  async createBreedingProfile(
    @Request() req,
    @Param('dogId') dogId: string,
    @Body() createBreedingProfileDto: CreateBreedingProfileDto,
  ) {
    return this.breedingService.createBreedingProfile(dogId, req.user.id, createBreedingProfileDto);
  }

  @Get('profiles')
  @ApiOperation({ summary: 'Get all available breeding profiles' })
  @ApiResponse({ status: 200, description: 'Breeding profiles retrieved successfully' })
  async findAllBreedingProfiles() {
    return this.breedingService.findAllBreedingProfiles();
  }

  @Get('profiles/:id')
  @ApiOperation({ summary: 'Get a specific breeding profile' })
  @ApiResponse({ status: 200, description: 'Breeding profile retrieved successfully' })
  async findBreedingProfile(@Param('id') id: string) {
    return this.breedingService.findBreedingProfile(id);
  }

  @Put('profiles/:id')
  @ApiOperation({ summary: 'Update a breeding profile' })
  @ApiResponse({ status: 200, description: 'Breeding profile updated successfully' })
  async updateBreedingProfile(
    @Request() req,
    @Param('id') id: string,
    @Body() updateBreedingProfileDto: UpdateBreedingProfileDto,
  ) {
    return this.breedingService.updateBreedingProfile(id, req.user.id, updateBreedingProfileDto);
  }

  @Post('profiles/:id/requests')
  @ApiOperation({ summary: 'Create a breeding request' })
  @ApiResponse({ status: 201, description: 'Breeding request created successfully' })
  async createBreedingRequest(
    @Request() req,
    @Param('id') breedingProfileId: string,
    @Body() body: { message?: string },
  ) {
    return this.breedingService.createBreedingRequest(breedingProfileId, req.user.id, body.message);
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get breeding requests for user' })
  @ApiResponse({ status: 200, description: 'Breeding requests retrieved successfully' })
  async getBreedingRequests(@Request() req) {
    return this.breedingService.getBreedingRequests(req.user.id);
  }

  @Put('requests/:id/status')
  @ApiOperation({ summary: 'Update breeding request status' })
  @ApiResponse({ status: 200, description: 'Breeding request status updated successfully' })
  async updateBreedingRequestStatus(
    @Request() req,
    @Param('id') requestId: string,
    @Body() body: { status: string },
  ) {
    return this.breedingService.updateBreedingRequestStatus(requestId, req.user.id, body.status);
  }
} 