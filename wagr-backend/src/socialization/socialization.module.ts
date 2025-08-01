import { Module } from '@nestjs/common';
import { SocializationService } from './socialization.service';
import { SocializationController } from './socialization.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SocializationService],
  controllers: [SocializationController],
  exports: [SocializationService],
})
export class SocializationModule {} 