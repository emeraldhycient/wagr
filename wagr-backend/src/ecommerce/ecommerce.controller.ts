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
} from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('ecommerce')
export class EcommerceController {
  constructor(private readonly ecommerceService: EcommerceService) {}

  // Product endpoints
  @Get('products')
  async getAllProducts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('category') category?: string,
  ) {
    return this.ecommerceService.getAllProducts(
      parseInt(page),
      parseInt(limit),
      category,
    );
  }

  @Get('products/search')
  async searchProducts(
    @Query('q') query: string,
    @Query('category') category?: string,
  ) {
    return this.ecommerceService.searchProducts(query, category);
  }

  @Get('products/:id')
  async getProductById(@Param('id') id: string) {
    return this.ecommerceService.getProductById(id);
  }

  @Post('products')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.ecommerceService.createProduct(createProductDto);
  }

  @Put('products/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.ecommerceService.updateProduct(id, updateProductDto);
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteProduct(@Param('id') id: string) {
    return this.ecommerceService.deleteProduct(id);
  }

  // Order endpoints
  @Post('orders')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Request() req,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ecommerceService.createOrder(req.user.userId, createOrderDto);
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  async getUserOrders(
    @Request() req,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.ecommerceService.getUserOrders(
      req.user.userId,
      parseInt(page),
      parseInt(limit),
    );
  }

  @Get('orders/:id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(@Param('id') id: string) {
    return this.ecommerceService.getOrderById(id);
  }

  @Put('orders/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ecommerceService.updateOrderStatus(id, updateOrderDto);
  }

  // Admin endpoints
  @Get('admin/orders')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getAllOrders(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('status') status?: string,
  ) {
    return this.ecommerceService.getAllOrders(
      parseInt(page),
      parseInt(limit),
      status,
    );
  }

  @Get('admin/analytics')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getSalesAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.ecommerceService.getSalesAnalytics(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}