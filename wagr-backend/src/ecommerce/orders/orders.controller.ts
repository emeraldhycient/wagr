import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { OrdersService, CreateOrderDto, UpdateOrderStatusDto } from './orders.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { OrderStatus } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, createOrderDto);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: OrderStatus
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    return this.ordersService.findAll(req.user.id, pageNum, limitNum, status);
  }

  @Get('stats')
  getMyOrderStats(@Request() req) {
    return this.ordersService.getOrderStats(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.ordersService.findOne(id, req.user.id);
  }

  @Get('number/:orderNumber')
  findByOrderNumber(@Request() req, @Param('orderNumber') orderNumber: string) {
    return this.ordersService.findByOrderNumber(orderNumber, req.user.id);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  cancelOrder(@Request() req, @Param('id') id: string) {
    return this.ordersService.cancelOrder(id, req.user.id);
  }

  // Admin endpoints
  @Get('admin/all')
  @UseGuards(AdminGuard)
  getAllOrders(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: OrderStatus,
    @Query('search') search?: string
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 20;
    return this.ordersService.getAllOrders(pageNum, limitNum, status, search);
  }

  @Get('admin/stats')
  @UseGuards(AdminGuard)
  getOrderStats() {
    return this.ordersService.getOrderStats();
  }

  @Get('admin/:id')
  @UseGuards(AdminGuard)
  getOrderDetails(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch('admin/:id/status')
  @UseGuards(AdminGuard)
  updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto);
  }
}
