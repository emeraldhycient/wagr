import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Admin Management
  @Post('admins')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get('admins')
  async getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Get('admins/:id')
  async getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }

  @Put('admins/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete('admins/:id')
  async deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }

  // Platform Analytics
  @Get('analytics')
  async getPlatformAnalytics() {
    return this.adminService.getPlatformAnalytics();
  }

  // User Management
  @Get('users')
  async getAllUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('search') search?: string,
  ) {
    return this.adminService.getAllUsers(
      parseInt(page),
      parseInt(limit),
      search,
    );
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Put('users/:id/verify')
  async updateUserVerification(
    @Param('id') id: string,
    @Body() body: { isVerified: boolean },
  ) {
    return this.adminService.updateUserVerification(id, body.isVerified);
  }

  // Content Moderation
  @Get('moderation/content')
  async getReportedContent() {
    return this.adminService.getReportedContent();
  }

  @Put('moderation/posts/:id')
  async moderatePost(
    @Param('id') id: string,
    @Body() body: { action: 'approve' | 'reject' | 'delete' },
  ) {
    return this.adminService.moderatePost(id, body.action);
  }

  // Service Provider Management
  @Get('service-providers')
  async getServiceProviders(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.adminService.getServiceProviders(
      parseInt(page),
      parseInt(limit),
    );
  }

  @Put('service-providers/:id/verify')
  async verifyServiceProvider(
    @Param('id') id: string,
    @Body() body: { isVerified: boolean },
  ) {
    return this.adminService.verifyServiceProvider(id, body.isVerified);
  }

  // Dashboard Overview
  @Get('dashboard')
  async getDashboardData() {
    const [analytics, recentUsers, recentOrders, recentPosts] = await Promise.all([
      this.adminService.getPlatformAnalytics(),
      this.adminService.getAllUsers(1, 5),
      this.adminService.getServiceProviders(1, 5),
      this.adminService.getReportedContent(),
    ]);

    return {
      analytics,
      recentUsers: recentUsers.users,
      recentOrders: recentOrders.providers,
      recentPosts,
    };
  }
}