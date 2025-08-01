import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController, WebhookController } from './payments.controller';
import { StripeService } from './stripe.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PaymentsService, StripeService],
  controllers: [PaymentsController, WebhookController],
  exports: [PaymentsService, StripeService],
})
export class PaymentsModule {} 