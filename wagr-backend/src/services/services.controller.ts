import { Controller, Get, Post, Body, Put, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ServicesService } from './services.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@ApiTags('Services')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post('providers')
  @ApiOperation({ summary: 'Create a service provider profile' })
  @ApiResponse({ status: 201, description: 'Service provider profile created successfully' })
  async createServiceProvider(@Request() req, @Body() createServiceProviderDto: CreateServiceProviderDto) {
    return this.servicesService.createServiceProvider(req.user.id, createServiceProviderDto);
  }

  @Get('providers')
  @ApiOperation({ summary: 'Get all verified service providers' })
  @ApiResponse({ status: 200, description: 'Service providers retrieved successfully' })
  async findAllServiceProviders() {
    return this.servicesService.findAllServiceProviders();
  }

  @Get('providers/:id')
  @ApiOperation({ summary: 'Get a specific service provider' })
  @ApiResponse({ status: 200, description: 'Service provider retrieved successfully' })
  async findServiceProvider(@Param('id') id: string) {
    return this.servicesService.findServiceProvider(id);
  }

  @Put('providers/:id')
  @ApiOperation({ summary: 'Update a service provider profile' })
  @ApiResponse({ status: 200, description: 'Service provider profile updated successfully' })
  async updateServiceProvider(
    @Request() req,
    @Param('id') id: string,
    @Body() updateServiceProviderDto: UpdateServiceProviderDto,
  ) {
    return this.servicesService.updateServiceProvider(id, req.user.id, updateServiceProviderDto);
  }

  @Post('bookings')
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  async createBooking(@Request() req, @Body() createBookingDto: CreateBookingDto) {
    return this.servicesService.createBooking(req.user.id, createBookingDto);
  }

  @Get('bookings')
  @ApiOperation({ summary: 'Get all bookings for user' })
  @ApiResponse({ status: 200, description: 'Bookings retrieved successfully' })
  async findAllBookings(@Request() req) {
    return this.servicesService.findAllBookings(req.user.id);
  }

  @Get('bookings/:id')
  @ApiOperation({ summary: 'Get a specific booking' })
  @ApiResponse({ status: 200, description: 'Booking retrieved successfully' })
  async findBooking(@Request() req, @Param('id') id: string) {
    return this.servicesService.findBooking(id, req.user.id);
  }

  @Put('bookings/:id/status')
  @ApiOperation({ summary: 'Update booking status' })
  @ApiResponse({ status: 200, description: 'Booking status updated successfully' })
  async updateBookingStatus(@Request() req, @Param('id') id: string, @Body() updateBookingStatusDto: UpdateBookingStatusDto) {
    return this.servicesService.updateBookingStatus(id, req.user.id, updateBookingStatusDto.status);
  }

  @Post('bookings/:id/reviews')
  @ApiOperation({ summary: 'Create a review for a booking' })
  @ApiResponse({ status: 201, description: 'Review created successfully' })
  async createReview(
    @Request() req,
    @Param('id') bookingId: string,
    @Body() body: { rating: number; comment?: string },
  ) {
    return this.servicesService.createReview(bookingId, req.user.id, body.rating, body.comment);
  }
} 