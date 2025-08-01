import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    CartModule,
    OrdersModule,
  ],
  exports: [
    CategoriesModule,
    ProductsModule,
    CartModule,
    OrdersModule,
  ],
})
export class EcommerceModule {}