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
  Request,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('analytics')
  async getAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.adminService.getAnalytics(start, end);
  }

  @Get('users')
  async getAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 20;
    return this.adminService.getAllUsers(pageNum, limitNum, search);
  }

  @Put('users/:id/status')
  async updateUserStatus(
    @Param('id') userId: string,
    @Body('isVerified') isVerified: boolean,
    @Request() req
  ) {
    await this.adminService.logAdminAction(
      req.user.id,
      'UPDATE_USER_STATUS',
      'user',
      userId,
      { isVerified }
    );
    return this.adminService.updateUserStatus(userId, isVerified);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id') userId: string,
    @Request() req
  ) {
    await this.adminService.logAdminAction(
      req.user.id,
      'DELETE_USER',
      'user',
      userId
    );
    return this.adminService.deleteUser(userId);
  }

  @Get('health')
  async getSystemHealth() {
    return this.adminService.getSystemHealth();
  }

  @Get('actions')
  async getAdminActions(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 50;
    return this.adminService.getAdminActions(pageNum, limitNum);
  }

  @Get('revenue')
  async getRevenueStats() {
    return this.adminService.getRevenueStats();
  }

  @Get('growth')
  async getUserGrowthStats() {
    return this.adminService.getUserGrowthStats();
  }
}
