import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@ApiTags('Dogs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dog profile' })
  @ApiResponse({ status: 201, description: 'Dog created successfully' })
  async create(@Request() req, @Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(req.user.id, createDogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user dogs' })
  @ApiResponse({ status: 200, description: 'Dogs retrieved successfully' })
  async findAll(@Request() req) {
    return this.dogsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific dog' })
  @ApiResponse({ status: 200, description: 'Dog retrieved successfully' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.dogsService.findOne(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a dog profile' })
  @ApiResponse({ status: 200, description: 'Dog updated successfully' })
  async update(@Request() req, @Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(id, req.user.id, updateDogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dog profile' })
  @ApiResponse({ status: 200, description: 'Dog deleted successfully' })
  async remove(@Request() req, @Param('id') id: string) {
    return this.dogsService.remove(id, req.user.id);
  }

  @Post(':id/photos')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiOperation({ summary: 'Add photo to dog profile' })
  @ApiResponse({ status: 200, description: 'Photo added successfully' })
  async addPhoto(@Request() req, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    // TODO: Implement file upload to S3
    const photoUrl = `https://example.com/dogs/${id}/photos/${file.filename}`;
    return this.dogsService.addPhoto(id, req.user.id, photoUrl);
  }
} 