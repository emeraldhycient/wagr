import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Request, 
  Get,
  Param,
  Headers,
  RawBodyRequest,
  Req,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeService: StripeService
  ) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Request() req,
    @Body() body: { amount: number; currency?: string; metadata?: any }
  ) {
    const paymentIntent = await this.stripeService.createPaymentIntent(
      body.amount,
      body.currency || 'usd',
      {
        userId: req.user.id,
        ...body.metadata
      }
    );
    
    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency
    };
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Request() req,
    @Body() body: {
      items: Array<{
        name: string;
        description: string;
        price: number;
        quantity: number;
        images?: string[];
      }>;
      successUrl: string;
      cancelUrl: string;
    }
  ) {
    const session = await this.stripeService.createCheckoutSession(
      body.items,
      body.successUrl,
      body.cancelUrl,
      { userId: req.user.id }
    );
    
    return {
      sessionId: session.id,
      url: session.url
    };
  }

  @Post('confirm-payment')
  async confirmPayment(
    @Body() body: { paymentIntentId: string; paymentMethodId: string }
  ) {
    const paymentIntent = await this.stripeService.confirmPaymentIntent(
      body.paymentIntentId,
      body.paymentMethodId
    );
    
    return {
      status: paymentIntent.status,
      paymentIntentId: paymentIntent.id
    };
  }

  @Get('payment-intent/:id')
  async getPaymentIntent(@Param('id') paymentIntentId: string) {
    const paymentIntent = await this.stripeService.retrievePaymentIntent(paymentIntentId);
    
    return {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata
    };
  }

  @Post('create-customer')
  async createCustomer(@Request() req) {
    const customer = await this.stripeService.createCustomer(
      req.user.email,
      `${req.user.firstName} ${req.user.lastName}`,
      { userId: req.user.id }
    );
    
    return {
      customerId: customer.id,
      email: customer.email
    };
  }

  @Post('refund')
  async createRefund(
    @Body() body: { 
      paymentIntentId: string; 
      amount?: number; 
      reason?: string 
    }
  ) {
    const refund = await this.stripeService.createRefund(
      body.paymentIntentId,
      body.amount,
      body.reason
    );
    
    return {
      refundId: refund.id,
      amount: refund.amount / 100,
      status: refund.status,
      reason: refund.reason
    };
  }

  @Get('payment-methods')
  async getPaymentMethods(@Request() req, @Body('customerId') customerId: string) {
    const paymentMethods = await this.stripeService.listPaymentMethods(customerId);
    
    return paymentMethods.data.map(pm => ({
      id: pm.id,
      type: pm.type,
      card: pm.card ? {
        brand: pm.card.brand,
        last4: pm.card.last4,
        expMonth: pm.card.exp_month,
        expYear: pm.card.exp_year
      } : null
    }));
  }

  @Post('attach-payment-method')
  async attachPaymentMethod(
    @Body() body: { paymentMethodId: string; customerId: string }
  ) {
    const paymentMethod = await this.stripeService.attachPaymentMethod(
      body.paymentMethodId,
      body.customerId
    );
    
    return {
      id: paymentMethod.id,
      type: paymentMethod.type,
      card: paymentMethod.card
    };
  }
}

// Separate controller for webhooks (no auth)
@Controller('webhooks')
export class WebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentsService: PaymentsService
  ) {}

  @Post('stripe')
  @HttpCode(HttpStatus.OK)
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>
  ) {
    try {
      const event = await this.stripeService.handleWebhook(
        request.rawBody,
        signature
      );
      
      // Handle different event types
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.paymentsService.handlePaymentSuccess(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.paymentsService.handlePaymentFailure(event.data.object);
          break;
        case 'checkout.session.completed':
          await this.paymentsService.handleCheckoutComplete(event.data.object);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      
      return { received: true };
    } catch (err) {
      console.error('Webhook error:', err.message);
      throw err;
    }
  }
} 