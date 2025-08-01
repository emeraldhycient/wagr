import { Module } from '@nestjs/common';
import { BreedingService } from './breeding.service';
import { BreedingController } from './breeding.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BreedingService],
  controllers: [BreedingController],
  exports: [BreedingService],
})
export class BreedingModule {} 