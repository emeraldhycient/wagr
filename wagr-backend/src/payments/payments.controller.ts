import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  @ApiOperation({ summary: 'Create a payment intent' })
  @ApiResponse({ status: 200, description: 'Payment intent created successfully' })
  async createPaymentIntent(@Body() body: { amount: number; currency?: string }) {
    return this.paymentsService.createPaymentIntent(body.amount, body.currency);
  }

  @Post('create-customer')
  @ApiOperation({ summary: 'Create a Stripe customer' })
  @ApiResponse({ status: 200, description: 'Customer created successfully' })
  async createCustomer(@Body() body: { email: string; name: string }) {
    return this.paymentsService.createCustomer(body.email, body.name);
  }

  @Post('create-subscription')
  @ApiOperation({ summary: 'Create a subscription' })
  @ApiResponse({ status: 200, description: 'Subscription created successfully' })
  async createSubscription(@Body() body: { customerId: string; priceId: string }) {
    return this.paymentsService.createSubscription(body.customerId, body.priceId);
  }
} 