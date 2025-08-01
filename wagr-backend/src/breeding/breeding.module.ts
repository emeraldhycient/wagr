import { Module } from '@nestjs/common';
import { BreedingService } from './breeding.service';
import { BreedingController } from './breeding.controller';

@Module({
  providers: [BreedingService],
  controllers: [BreedingController],
  exports: [BreedingService],
})
export class BreedingModule {} 