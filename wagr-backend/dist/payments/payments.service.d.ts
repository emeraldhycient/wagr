import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
export declare class PaymentsService {
    private configService;
    private stripe;
    private readonly logger;
    constructor(configService: ConfigService);
    private checkStripeAvailability;
    createPaymentIntent(amount: number, currency?: string): Promise<{
        clientSecret: string;
    }>;
    createCustomer(email: string, name: string): Promise<Stripe.Response<Stripe.Customer>>;
    createSubscription(customerId: string, priceId: string): Promise<Stripe.Response<Stripe.Subscription>>;
    getPaymentMethods(customerId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>;
    refundPayment(paymentIntentId: string, amount?: number): Promise<Stripe.Response<Stripe.Refund>>;
}
