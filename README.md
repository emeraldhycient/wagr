# Wagr - Dog Social Platform

A comprehensive dog social platform with a mobile app and backend API, featuring social networking for dog owners, ecommerce for dog accessories, and admin dashboard for platform management.

## 🚀 Project Overview

Wagr is a multi-feature platform that connects dog owners, service providers, and dog lovers through:

- **Social Networking**: Dog profiles, events, playdates, and community features
- **Breeding & Adoption**: Matchmaking services and adoption listings  
- **Services**: Dog walking, training, and pet sitting marketplace
- **Ecommerce**: Dog accessories and supplies store
- **Admin Dashboard**: Platform management and analytics

## 📱 Tech Stack

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **File Storage**: AWS S3 integration
- **Payments**: Stripe integration
- **API Documentation**: Swagger/OpenAPI

### Mobile App (React Native)
- **Framework**: Expo React Native with TypeScript
- **Navigation**: React Navigation v6
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form with Yup validation
- **UI Components**: Custom components with React Native

### Admin Dashboard (To be implemented)
- **Framework**: Next.js with TypeScript
- **UI Library**: Tailwind CSS or Material-UI
- **Charts**: Chart.js or Recharts

## 🏗️ Project Structure

```
wagr-backend/
├── src/
│   ├── auth/           # Authentication module
│   ├── users/          # User management
│   ├── dogs/           # Dog profiles
│   ├── socialization/  # Events and social features
│   ├── breeding/       # Breeding matchmaking
│   ├── adoption/       # Dog adoption
│   ├── gallery/        # Photo/video sharing
│   ├── services/       # Dog services marketplace
│   ├── payments/       # Payment processing
│   ├── notifications/  # Push notifications
│   ├── ecommerce/      # Shopping features
│   │   ├── categories/ # Product categories
│   │   ├── products/   # Product management
│   │   ├── cart/       # Shopping cart
│   │   └── orders/     # Order management
│   ├── admin/          # Admin management
│   └── prisma/         # Database client
├── prisma/
│   └── schema.prisma   # Database schema
└── package.json

wagr-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens
│   │   ├── auth/       # Login, register, onboarding
│   │   ├── main/       # Main app screens
│   │   ├── ecommerce/  # Shopping screens
│   │   └── ...
│   ├── navigation/     # Navigation configuration
│   ├── store/          # Redux store and slices
│   ├── services/       # API service layer
│   ├── types/          # TypeScript definitions
│   ├── constants/      # App constants
│   └── utils/          # Utility functions
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- AWS S3 bucket (optional, for file storage)
- Stripe account (optional, for payments)
- Expo CLI (for mobile development)

### Backend Setup

1. **Clone and navigate to backend:**
   ```bash
   cd wagr-backend
   npm install
   ```

2. **Environment Configuration:**
   Create `.env` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/wagr"
   JWT_SECRET="your-jwt-secret-key"
   STRIPE_SECRET_KEY="sk_test_..."
   AWS_ACCESS_KEY_ID="your-aws-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret"
   AWS_REGION="us-east-1"
   AWS_S3_BUCKET="your-bucket-name"
   ```

3. **Database Setup:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start Development Server:**
   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000`
   Swagger documentation: `http://localhost:3000/api`

### Mobile App Setup

1. **Navigate to mobile app:**
   ```bash
   cd wagr-app
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm start
   ```

3. **Run on Device/Simulator:**
   ```bash
   npm run ios     # iOS Simulator
   npm run android # Android Emulator
   npm run web     # Web browser
   ```

## 🔧 Available Scripts

### Backend
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Mobile App
- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web browser

## 📱 Features Implemented

### ✅ Backend Core Features
- **Authentication System**: JWT-based auth with registration/login
- **User Management**: Profile management and user types
- **Dog Profiles**: Complete dog profile management
- **Social Features**: Events, posts, likes, comments
- **Breeding System**: Breeding profiles and matching
- **Adoption System**: Adoption listings and applications
- **Service Marketplace**: Service providers and bookings
- **Ecommerce**: Full shopping cart and order management
- **Admin Dashboard**: User management and platform analytics
- **Database Schema**: Complete relational database design

### ✅ Mobile App Core Features
- **Authentication Flow**: Login, registration, and onboarding
- **Navigation**: Tab-based navigation with stack navigation
- **State Management**: Redux with async actions
- **API Integration**: Axios-based API service layer
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first UI components

### 🚧 Features In Development
- **Advanced Product Catalog**: Search, filters, recommendations
- **Real-time Chat**: WebSocket-based messaging
- **Push Notifications**: Real-time updates
- **Admin Web Dashboard**: Comprehensive management interface
- **Payment Integration**: Stripe payment processing
- **File Upload**: Image and video handling
- **Location Services**: GPS-based features

## 🌟 Key Features

### Social Networking
- **Dog Profiles**: Detailed profiles with photos, medical records, interests
- **Events & Playdates**: Location-based meetups and social events
- **Photo Gallery**: Pinterest-style photo sharing with hashtags
- **Community**: Social interactions, comments, likes

### Marketplace
- **Dog Services**: Walking, training, pet sitting with booking system
- **Service Ratings**: Two-way rating system for quality assurance
- **Real-time Tracking**: GPS tracking for dog walks

### Ecommerce
- **Product Catalog**: Dog accessories, food, toys, supplies
- **Shopping Cart**: Full cart management with variants
- **Order Management**: Complete order lifecycle
- **Inventory Tracking**: Real-time stock management
- **Payment Processing**: Secure Stripe integration

### Breeding & Adoption
- **Breeding Matchmaking**: Algorithm-based compatibility matching
- **Health Records**: Medical history and genetic information
- **Adoption Listings**: Shelter integration and applications
- **Background Checks**: Verification services integration

### Admin Dashboard
- **User Management**: User profiles, moderation, analytics
- **Content Moderation**: Post approval and management
- **Platform Analytics**: Detailed insights and reporting
- **Order Management**: Ecommerce order oversight

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: API abuse prevention
- **Role-based Access**: Admin, user, and service provider roles
- **Data Encryption**: Sensitive data protection

## 📊 Database Schema

The platform uses PostgreSQL with a comprehensive schema including:

- **Users & Authentication**: User profiles, roles, permissions
- **Dog Management**: Dog profiles, medical records, photos
- **Social Features**: Events, posts, comments, likes
- **Marketplace**: Service providers, bookings, reviews
- **Ecommerce**: Products, categories, cart, orders, payments
- **Admin Features**: Audit logs, analytics, moderation

## 🚀 Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```

### Mobile App Deployment
```bash
# Build for production
eas build --platform all

# Submit to app stores
eas submit --platform all
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the API documentation at `/api` endpoint
- Review the mobile app documentation in the `docs/` folder

## 🏗️ Architecture

### Backend Architecture
- **Modular Design**: Feature-based module organization
- **Clean Architecture**: Separation of concerns with services, controllers, DTOs
- **Database-First**: Prisma ORM with type-safe database access
- **API-First**: RESTful API design with OpenAPI documentation

### Mobile Architecture
- **Component-Based**: Reusable UI components
- **State Management**: Centralized Redux store with slices
- **Service Layer**: Abstracted API calls with error handling
- **Type Safety**: End-to-end TypeScript implementation

---

Built with ❤️ for dog lovers everywhere! 🐕