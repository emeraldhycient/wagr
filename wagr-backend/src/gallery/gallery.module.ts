import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [GalleryService],
  providers: [GalleryService],
  controllers: [GalleryController],
})
export class GalleryModule {} 