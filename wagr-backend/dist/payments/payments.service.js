"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(configService) {
        this.configService = configService;
        this.stripe = null;
        this.logger = new common_1.Logger(PaymentsService_1.name);
        const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
        if (!stripeSecretKey) {
            this.logger.warn('STRIPE_SECRET_KEY not found in environment variables. Payment features will be disabled.');
            return;
        }
        try {
            this.stripe = new stripe_1.default(stripeSecretKey, {
                apiVersion: '2025-07-30.basil',
            });
            this.logger.log('Stripe client initialized successfully');
        }
        catch (error) {
            this.logger.error('Failed to initialize Stripe client:', error);
            this.stripe = null;
        }
    }
    checkStripeAvailability() {
        if (!this.stripe) {
            this.logger.warn('Stripe is not configured. Please set STRIPE_SECRET_KEY in your environment variables.');
            return false;
        }
        return true;
    }
    async createPaymentIntent(amount, currency = 'usd') {
        if (!this.checkStripeAvailability()) {
            throw new Error('Payment service is not available. Please configure Stripe.');
        }
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount,
                currency,
            });
            return {
                clientSecret: paymentIntent.client_secret,
            };
        }
        catch (error) {
            this.logger.error('Failed to create payment intent:', error);
            throw new Error('Failed to create payment intent');
        }
    }
    async createCustomer(email, name) {
        if (!this.checkStripeAvailability()) {
            throw new Error('Payment service is not available. Please configure Stripe.');
        }
        try {
            return await this.stripe.customers.create({
                email,
                name,
            });
        }
        catch (error) {
            this.logger.error('Failed to create customer:', error);
            throw new Error('Failed to create customer');
        }
    }
    async createSubscription(customerId, priceId) {
        if (!this.checkStripeAvailability()) {
            throw new Error('Payment service is not available. Please configure Stripe.');
        }
        try {
            return await this.stripe.subscriptions.create({
                customer: customerId,
                items: [{ price: priceId }],
            });
        }
        catch (error) {
            this.logger.error('Failed to create subscription:', error);
            throw new Error('Failed to create subscription');
        }
    }
    async getPaymentMethods(customerId) {
        if (!this.checkStripeAvailability()) {
            throw new Error('Payment service is not available. Please configure Stripe.');
        }
        try {
            return await this.stripe.paymentMethods.list({
                customer: customerId,
                type: 'card',
            });
        }
        catch (error) {
            this.logger.error('Failed to get payment methods:', error);
            throw new Error('Failed to get payment methods');
        }
    }
    async refundPayment(paymentIntentId, amount) {
        if (!this.checkStripeAvailability()) {
            throw new Error('Payment service is not available. Please configure Stripe.');
        }
        try {
            const refundParams = { payment_intent: paymentIntentId };
            if (amount) {
                refundParams.amount = amount;
            }
            return await this.stripe.refunds.create(refundParams);
        }
        catch (error) {
            this.logger.error('Failed to refund payment:', error);
            throw new Error('Failed to refund payment');
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map