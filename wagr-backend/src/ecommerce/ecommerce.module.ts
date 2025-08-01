import { Module } from '@nestjs/common';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { CartService } from './cart/cart.service';
import { CartController } from './cart/cart.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController, CartController, OrdersController],
  providers: [ProductsService, CartService, OrdersService],
  exports: [ProductsService, CartService, OrdersService]
})
export class EcommerceModule {}
