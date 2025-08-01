import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
export declare class PaymentsService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createPaymentIntent(amount: number, currency?: string): Promise<{
        clientSecret: string;
    }>;
    createCustomer(email: string, name: string): Promise<Stripe.Response<Stripe.Customer>>;
    createSubscription(customerId: string, priceId: string): Promise<Stripe.Response<Stripe.Subscription>>;
}
