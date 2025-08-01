import { Module } from '@nestjs/common';
import { SocializationService } from './socialization.service';
import { SocializationController } from './socialization.controller';

@Module({
  providers: [SocializationService],
  controllers: [SocializationController],
  exports: [SocializationService],
})
export class SocializationModule {} 