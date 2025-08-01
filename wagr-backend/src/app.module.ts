import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DogsModule } from './dogs/dogs.module';
import { SocializationModule } from './socialization/socialization.module';
import { BreedingModule } from './breeding/breeding.module';
import { AdoptionModule } from './adoption/adoption.module';
import { GalleryModule } from './gallery/gallery.module';
import { ServicesModule } from './services/services.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DogsModule,
    SocializationModule,
    BreedingModule,
    AdoptionModule,
    GalleryModule,
    ServicesModule,
    PaymentsModule,
    NotificationsModule,
  ],
})
export class AppModule {} 