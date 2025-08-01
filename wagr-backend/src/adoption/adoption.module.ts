import { Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AdoptionService],
  controllers: [AdoptionController],
  exports: [AdoptionService],
})
export class AdoptionModule {} 