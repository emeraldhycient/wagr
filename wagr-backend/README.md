# Wagr Backend - Dog Social Platform API

A comprehensive NestJS backend for the Wagr dog social platform, built with TypeScript, Prisma ORM, and PostgreSQL.

## Features

### Core Features
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user profile management with dog owner and service provider roles
- **Dog Profiles**: Comprehensive dog profile management with medical records and preferences
- **Socialization Events**: Create and manage dog playdates, parties, and training events
- **Breeding Matchmaking**: Breeding profiles with health screening and genetic information
- **Adoption System**: Dog adoption listings with application management
- **Gallery**: Pinterest-style photo sharing with likes, comments, and hashtags
- **Dog Walking Services**: Service provider profiles with booking and review system
- **Payment Integration**: Stripe payment processing for services and subscriptions
- **Notifications**: Real-time notification system for platform activities

### Technical Features
- **RESTful API**: Comprehensive API with Swagger documentation
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **Validation**: Class-validator for request validation
- **File Upload**: AWS S3 integration for media storage
- **Security**: JWT authentication, password hashing, and input sanitization
- **Testing**: Unit and integration test setup

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── jwt.strategy.ts
│   ├── local.strategy.ts
│   ├── guards/
│   └── dto/
├── users/               # User management
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── dto/
├── dogs/                # Dog profile management
│   ├── dogs.module.ts
│   ├── dogs.service.ts
│   ├── dogs.controller.ts
│   └── dto/
├── socialization/       # Events and playdates
│   ├── socialization.module.ts
│   ├── socialization.service.ts
│   ├── socialization.controller.ts
│   └── dto/
├── breeding/           # Breeding matchmaking
│   ├── breeding.module.ts
│   ├── breeding.service.ts
│   ├── breeding.controller.ts
│   └── dto/
├── adoption/           # Dog adoption system
│   ├── adoption.module.ts
│   ├── adoption.service.ts
│   ├── adoption.controller.ts
│   └── dto/
├── gallery/            # Photo sharing and social features
│   ├── gallery.module.ts
│   ├── gallery.service.ts
│   ├── gallery.controller.ts
│   └── dto/
├── services/           # Dog walking services
│   ├── services.module.ts
│   ├── services.service.ts
│   ├── services.controller.ts
│   └── dto/
├── payments/           # Payment processing
│   ├── payments.module.ts
│   ├── payments.service.ts
│   └── payments.controller.ts
├── notifications/      # Notification system
│   ├── notifications.module.ts
│   ├── notifications.service.ts
│   └── notifications.controller.ts
├── prisma/            # Database configuration
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── app.module.ts      # Main application module
└── main.ts           # Application entry point
```

## Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User accounts with roles (DOG_OWNER, SERVICE_PROVIDER, BOTH)
- **Dogs**: Dog profiles with medical information and preferences
- **Events**: Socialization events (playdates, parties, training)
- **Breeding Profiles**: Breeding matchmaking with health screening
- **Adoption Profiles**: Dog adoption listings
- **Posts**: Gallery posts with media and social interactions
- **Service Providers**: Dog walking service providers
- **Bookings**: Service bookings with reviews
- **Notifications**: User notifications

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `POST /users/profile/photo` - Upload profile photo

### Dogs
- `POST /dogs` - Create dog profile
- `GET /dogs` - Get user's dogs
- `GET /dogs/:id` - Get specific dog
- `PUT /dogs/:id` - Update dog profile
- `DELETE /dogs/:id` - Delete dog profile
- `POST /dogs/:id/photos` - Add dog photos

### Socialization
- `POST /socialization/events` - Create event
- `GET /socialization/events` - Get all events
- `GET /socialization/events/:id` - Get specific event
- `PUT /socialization/events/:id` - Update event
- `DELETE /socialization/events/:id` - Delete event
- `POST /socialization/events/:id/join` - Join event
- `POST /socialization/events/:id/leave` - Leave event

### Breeding
- `POST /breeding/profiles/:dogId` - Create breeding profile
- `GET /breeding/profiles` - Get all breeding profiles
- `GET /breeding/profiles/:id` - Get specific breeding profile
- `PUT /breeding/profiles/:id` - Update breeding profile
- `POST /breeding/profiles/:id/requests` - Create breeding request
- `GET /breeding/requests` - Get breeding requests
- `PUT /breeding/requests/:id/status` - Update request status

### Adoption
- `POST /adoption/profiles/:dogId` - Create adoption profile
- `GET /adoption/profiles` - Get all adoption profiles
- `GET /adoption/profiles/:id` - Get specific adoption profile
- `PUT /adoption/profiles/:id` - Update adoption profile
- `POST /adoption/profiles/:id/applications` - Create adoption application
- `GET /adoption/applications` - Get adoption applications
- `PUT /adoption/applications/:id/status` - Update application status

### Gallery
- `POST /gallery/posts` - Create post
- `GET /gallery/posts` - Get all posts
- `GET /gallery/posts/:id` - Get specific post
- `PUT /gallery/posts/:id` - Update post
- `DELETE /gallery/posts/:id` - Delete post
- `POST /gallery/posts/:id/like` - Like post
- `DELETE /gallery/posts/:id/like` - Unlike post
- `POST /gallery/posts/:id/comments` - Create comment
- `DELETE /gallery/comments/:id` - Delete comment

### Services
- `POST /services/providers` - Create service provider profile
- `GET /services/providers` - Get all service providers
- `GET /services/providers/:id` - Get specific service provider
- `PUT /services/providers/:id` - Update service provider profile
- `POST /services/bookings` - Create booking
- `GET /services/bookings` - Get all bookings
- `GET /services/bookings/:id` - Get specific booking
- `PUT /services/bookings/:id/status` - Update booking status
- `POST /services/bookings/:id/reviews` - Create review

### Payments
- `POST /payments/create-payment-intent` - Create payment intent
- `POST /payments/create-customer` - Create Stripe customer
- `POST /payments/create-subscription` - Create subscription

### Notifications
- `GET /notifications` - Get all notifications
- `PUT /notifications/:id/read` - Mark notification as read
- `PUT /notifications/read-all` - Mark all notifications as read
- `DELETE /notifications/:id` - Delete notification

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wagr-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/wagr_db"
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_EXPIRES_IN="7d"
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="us-east-1"
   AWS_S3_BUCKET="wagr-media-bucket"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
   PORT=3000
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   # Create database migration
   npx prisma migrate dev --name init
   
   # Generate Prisma client
   npx prisma generate
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## Development

### Available Scripts
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma client

### Database Management
```bash
# Create a new migration
npx prisma migrate dev --name <migration-name>

# Reset database
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio

# Push schema changes (for development)
npx prisma db push
```

### API Documentation
Once the server is running, visit `http://localhost:3000/api` to view the Swagger API documentation.

## Testing

The application includes comprehensive testing setup:

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

## Deployment

### Docker Deployment
```bash
# Build Docker image
docker build -t wagr-backend .

# Run container
docker run -p 3000:3000 wagr-backend
```

### Environment Variables for Production
Make sure to set the following environment variables in production:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Strong secret for JWT signing
- `AWS_*` - AWS S3 credentials for file uploads
- `STRIPE_*` - Stripe API keys for payments
- `NODE_ENV=production`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the ISC License. 