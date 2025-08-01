import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { CartService, AddToCartDto, UpdateCartItemDto } from './cart.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getOrCreateCart(req.user.id);
  }

  @Get('summary')
  getCartSummary(@Request() req) {
    return this.cartService.getCartSummary(req.user.id);
  }

  @Post('items')
  addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, addToCartDto);
  }

  @Patch('items/:id')
  updateCartItem(
    @Request() req,
    @Param('id') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ) {
    return this.cartService.updateCartItem(req.user.id, itemId, updateCartItemDto);
  }

  @Delete('items/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeFromCart(@Request() req, @Param('id') itemId: string) {
    return this.cartService.removeFromCart(req.user.id, itemId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }

  @Post('validate')
  validateCart(@Request() req) {
    return this.cartService.validateCart(req.user.id);
  }

  @Post('merge')
  mergeGuestCart(@Request() req, @Body() guestCartItems: AddToCartDto[]) {
    return this.cartService.mergeGuestCart(req.user.id, guestCartItems);
  }
}
