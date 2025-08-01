import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPaymentIntent(body: {
        amount: number;
        currency?: string;
    }): Promise<{
        clientSecret: string;
    }>;
    createCustomer(body: {
        email: string;
        name: string;
    }): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Customer>>;
    createSubscription(body: {
        customerId: string;
        priceId: string;
    }): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Subscription>>;
}
