import { Controller, Get, Post, Body, Put, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionProfileDto } from './dto/create-adoption-profile.dto';
import { UpdateAdoptionProfileDto } from './dto/update-adoption-profile.dto';

@ApiTags('Adoption')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('adoption')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post('profiles/:dogId')
  @ApiOperation({ summary: 'Create an adoption profile for a dog' })
  @ApiResponse({ status: 201, description: 'Adoption profile created successfully' })
  async createAdoptionProfile(
    @Request() req,
    @Param('dogId') dogId: string,
    @Body() createAdoptionProfileDto: CreateAdoptionProfileDto,
  ) {
    return this.adoptionService.createAdoptionProfile(dogId, req.user.id, createAdoptionProfileDto);
  }

  @Get('profiles')
  @ApiOperation({ summary: 'Get all available adoption profiles' })
  @ApiResponse({ status: 200, description: 'Adoption profiles retrieved successfully' })
  async findAllAdoptionProfiles() {
    return this.adoptionService.findAllAdoptionProfiles();
  }

  @Get('profiles/:id')
  @ApiOperation({ summary: 'Get a specific adoption profile' })
  @ApiResponse({ status: 200, description: 'Adoption profile retrieved successfully' })
  async findAdoptionProfile(@Param('id') id: string) {
    return this.adoptionService.findAdoptionProfile(id);
  }

  @Put('profiles/:id')
  @ApiOperation({ summary: 'Update an adoption profile' })
  @ApiResponse({ status: 200, description: 'Adoption profile updated successfully' })
  async updateAdoptionProfile(
    @Request() req,
    @Param('id') id: string,
    @Body() updateAdoptionProfileDto: UpdateAdoptionProfileDto,
  ) {
    return this.adoptionService.updateAdoptionProfile(id, req.user.id, updateAdoptionProfileDto);
  }

  @Post('profiles/:id/applications')
  @ApiOperation({ summary: 'Create an adoption application' })
  @ApiResponse({ status: 201, description: 'Adoption application created successfully' })
  async createAdoptionApplication(
    @Request() req,
    @Param('id') adoptionProfileId: string,
    @Body() body: { message?: string },
  ) {
    return this.adoptionService.createAdoptionApplication(adoptionProfileId, req.user.id, body.message);
  }

  @Get('applications')
  @ApiOperation({ summary: 'Get adoption applications for user' })
  @ApiResponse({ status: 200, description: 'Adoption applications retrieved successfully' })
  async getAdoptionApplications(@Request() req) {
    return this.adoptionService.getAdoptionApplications(req.user.id);
  }

  @Put('applications/:id/status')
  @ApiOperation({ summary: 'Update adoption application status' })
  @ApiResponse({ status: 200, description: 'Adoption application status updated successfully' })
  async updateAdoptionApplicationStatus(
    @Request() req,
    @Param('id') applicationId: string,
    @Body() body: { status: string },
  ) {
    return this.adoptionService.updateAdoptionApplicationStatus(applicationId, req.user.id, body.status);
  }
} 