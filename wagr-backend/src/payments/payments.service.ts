import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe | null = null;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private configService: ConfigService) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    
    if (!stripeSecretKey) {
      this.logger.warn('STRIPE_SECRET_KEY not found in environment variables. Payment features will be disabled.');
      return;
    }

    try {
      this.stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2025-07-30.basil',
      });
      this.logger.log('Stripe client initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Stripe client:', error);
      this.stripe = null;
    }
  }

  private checkStripeAvailability(): boolean {
    if (!this.stripe) {
      this.logger.warn('Stripe is not configured. Please set STRIPE_SECRET_KEY in your environment variables.');
      return false;
    }
    return true;
  }

  async createPaymentIntent(amount: number, currency: string = 'usd') {
    if (!this.checkStripeAvailability()) {
      throw new Error('Payment service is not available. Please configure Stripe.');
    }

    try {
      const paymentIntent = await this.stripe!.paymentIntents.create({
        amount,
        currency,
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    } catch (error) {
      this.logger.error('Failed to create payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  async createCustomer(email: string, name: string) {
    if (!this.checkStripeAvailability()) {
      throw new Error('Payment service is not available. Please configure Stripe.');
    }

    try {
      return await this.stripe!.customers.create({
        email,
        name,
      });
    } catch (error) {
      this.logger.error('Failed to create customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  async createSubscription(customerId: string, priceId: string) {
    if (!this.checkStripeAvailability()) {
      throw new Error('Payment service is not available. Please configure Stripe.');
    }

    try {
      return await this.stripe!.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
      });
    } catch (error) {
      this.logger.error('Failed to create subscription:', error);
      throw new Error('Failed to create subscription');
    }
  }

  async getPaymentMethods(customerId: string) {
    if (!this.checkStripeAvailability()) {
      throw new Error('Payment service is not available. Please configure Stripe.');
    }

    try {
      return await this.stripe!.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });
    } catch (error) {
      this.logger.error('Failed to get payment methods:', error);
      throw new Error('Failed to get payment methods');
    }
  }

  async refundPayment(paymentIntentId: string, amount?: number) {
    if (!this.checkStripeAvailability()) {
      throw new Error('Payment service is not available. Please configure Stripe.');
    }

    try {
      const refundParams: any = { payment_intent: paymentIntentId };
      if (amount) {
        refundParams.amount = amount;
      }

      return await this.stripe!.refunds.create(refundParams);
    } catch (error) {
      this.logger.error('Failed to refund payment:', error);
      throw new Error('Failed to refund payment');
    }
  }
} 