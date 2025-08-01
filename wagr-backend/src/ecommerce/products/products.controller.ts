import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ProductsService, CreateProductDto, UpdateProductDto, ProductFilterDto } from './products.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { ProductCategory } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: ProductCategory,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('tags') tags?: string,
    @Query('search') search?: string,
    @Query('isActive') isActive?: string,
    @Query('inStock') inStock?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 20;
    
    const filter: ProductFilterDto = {
      ...(category && { category }),
      ...(minPrice && { minPrice: parseFloat(minPrice) }),
      ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
      ...(tags && { tags: tags.split(',') }),
      ...(search && { search }),
      ...(isActive && { isActive: isActive === 'true' }),
      ...(inStock && { inStock: inStock === 'true' })
    };

    return this.productsService.findAll(
      pageNum,
      limitNum,
      filter,
      sortBy || 'createdAt',
      sortOrder || 'desc'
    );
  }

  @Get('featured')
  getFeaturedProducts(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 8;
    return this.productsService.getFeaturedProducts(limitNum);
  }

  @Get('categories')
  getCategories() {
    return this.productsService.getCategories();
  }

  @Get('search')
  searchProducts(
    @Query('q') query: string,
    @Query('limit') limit?: string
  ) {
    const limitNum = limit ? parseInt(limit) : 10;
    return this.productsService.searchProducts(query, limitNum);
  }

  @Get('low-stock')
  @UseGuards(JwtAuthGuard, AdminGuard)
  getLowStockProducts(@Query('threshold') threshold?: string) {
    const thresholdNum = threshold ? parseInt(threshold) : 10;
    return this.productsService.getLowStockProducts(thresholdNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('sku/:sku')
  findBySku(@Param('sku') sku: string) {
    return this.productsService.findBySku(sku);
  }

  @Get(':id/related')
  getRelatedProducts(
    @Param('id') id: string,
    @Query('limit') limit?: string
  ) {
    const limitNum = limit ? parseInt(limit) : 4;
    return this.productsService.getRelatedProducts(id, limitNum);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, AdminGuard)
  updateStock(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
    @Body('operation') operation: 'add' | 'subtract' | 'set'
  ) {
    return this.productsService.updateStock(id, quantity, operation);
  }

  @Post('bulk-price-update')
  @UseGuards(JwtAuthGuard, AdminGuard)
  bulkUpdatePrices(
    @Body() updates: { id: string; price?: number; salePrice?: number }[]
  ) {
    return this.productsService.bulkUpdatePrices(updates);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
