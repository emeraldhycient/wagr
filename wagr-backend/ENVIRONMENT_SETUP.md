# Environment Setup for Wagr Backend

## Required Environment Variables

Create a `.env` file in the `wagr-backend` directory with the following variables:

### Database Configuration
```env
DATABASE_URL="postgresql://username:password@localhost:5432/wagr_db?schema=public"
```

### JWT Authentication
```env
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
```

### Stripe Payment Integration
```env
STRIPE_SECRET_KEY="sk_test_your_stripe_test_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_test_publishable_key"
```

### Server Configuration
```env
PORT=3000
NODE_ENV="development"
```

### AWS S3 File Storage (Optional)
```env
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="wagr-media-bucket"
```

### Email Configuration (Optional)
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## Getting Started

1. **Copy the sample environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the values in `.env` with your actual credentials**

3. **For Stripe (required for payments):**
   - Sign up at [stripe.com](https://stripe.com)
   - Get your test API keys from the Stripe Dashboard
   - Replace the placeholder values in `.env`

4. **For Database:**
   - Set up a PostgreSQL database
   - Update the `DATABASE_URL` with your connection string

5. **Start the development server:**
   ```bash
   npm run start:dev
   ```

## Payment Service Behavior

The `PaymentsService` is designed to be resilient:

- **If Stripe is not configured**: The service will log a warning and disable payment features
- **If Stripe is configured**: All payment methods will work normally
- **Error handling**: All payment operations include proper error handling and logging

## Security Notes

- Never commit your `.env` file to version control
- Use strong, unique secrets for `JWT_SECRET`
- Use test keys for development, production keys for production
- Regularly rotate your API keys 