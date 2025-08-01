# Wagr - Dog Social Platform

A comprehensive dog social platform with an Expo React Native mobile app and NestJS backend. This platform connects dog owners, service providers, and dog lovers through various features including socialization, breeding, adoption, ecommerce, and more.

## 🚀 Features

### Core Features
- **Dog Socialization Hub**: Schedule play dates, parties, and events
- **Dog Breeding Matchmaking**: Find compatible breeding partners
- **Dog Adoption & Discovery**: Browse and apply for dog adoption
- **Dog Gallery**: Pinterest-style photo sharing and social interactions
- **Dog Walking Services**: Book professional dog walking services
- **Ecommerce Platform**: Shop for dog accessories and supplies
- **Admin Dashboard**: Comprehensive admin panel for platform management

### Technical Features
- **Authentication**: JWT-based authentication with role-based access
- **Real-time Features**: WebSocket integration for live updates
- **Payment Integration**: Stripe payment processing
- **File Management**: AWS S3 integration for media storage
- **Geolocation**: Location-based services and event discovery
- **Search & Filtering**: Advanced search with Elasticsearch integration

## 🏗️ Architecture

### Backend (NestJS)
```
wagr-backend/
├── src/
│   ├── auth/           # Authentication & authorization
│   ├── users/          # User management
│   ├── dogs/           # Dog profiles
│   ├── socialization/  # Events & play dates
│   ├── breeding/       # Breeding matchmaking
│   ├── adoption/       # Dog adoption
│   ├── gallery/        # Photo sharing
│   ├── services/       # Dog walking services
│   ├── ecommerce/      # Product & order management
│   ├── admin/          # Admin dashboard
│   ├── payments/       # Payment processing
│   └── notifications/  # Push notifications
```

### Frontend (React Native + Expo)
```
wagr-app/
├── src/
│   ├── screens/
│   │   ├── auth/       # Login, register, onboarding
│   │   └── main/       # Main app screens
│   ├── contexts/       # React contexts
│   ├── services/       # API services
│   └── components/     # Reusable components
```

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **File Storage**: AWS S3
- **Payments**: Stripe
- **Real-time**: Socket.io
- **Validation**: class-validator

### Frontend
- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **UI Library**: React Native Paper
- **State Management**: React Context
- **HTTP Client**: Axios
- **Storage**: AsyncStorage

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Expo CLI
- Docker (optional)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wagr-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. **Navigate to the app directory**
   ```bash
   cd wagr-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/wagr"

# JWT
JWT_SECRET="your-jwt-secret"

# AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"

# App
PORT=3000
NODE_ENV=development
```

#### Frontend (app.json)
```json
{
  "expo": {
    "name": "Wagr",
    "slug": "wagr-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## 📱 Features Overview

### 1. Dog Socialization Hub
- Create and join dog meetups
- Schedule recurring playgroups
- Location-based event discovery
- RSVP system with capacity limits
- Event calendar with visual interface

### 2. Dog Breeding Matchmaking
- Breed compatibility algorithms
- Detailed breeding profiles
- Health screening verification
- Breeding contract management
- Genetic information tracking

### 3. Dog Adoption & Discovery
- Comprehensive adoption listings
- Shelter integration
- Streamlined application process
- Background check integration
- Foster network connections

### 4. Ecommerce Platform
- Product catalog with categories
- Shopping cart functionality
- Secure payment processing
- Order tracking
- Admin product management

### 5. Admin Dashboard
- User management
- Content moderation
- Analytics and reporting
- Service provider verification
- Platform statistics

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Data encryption at rest
- API rate limiting
- Secure file upload validation

## 🚀 Deployment

### Backend Deployment
1. Build the application
   ```bash
   npm run build
   ```

2. Set up production environment variables
3. Deploy to your preferred hosting service (Heroku, AWS, etc.)

### Frontend Deployment
1. Build for production
   ```bash
   expo build:android  # For Android
   expo build:ios      # For iOS
   ```

2. Submit to app stores or distribute via Expo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Basic authentication
- ✅ User profiles
- ✅ Dog profiles
- ✅ Event creation
- ✅ Ecommerce platform
- ✅ Admin dashboard

### Phase 2 (Planned)
- 🔄 Real-time messaging
- 🔄 Advanced search filters
- 🔄 Push notifications
- 🔄 Video calling
- 🔄 Advanced analytics

### Phase 3 (Future)
- 📋 AI-powered breed matching
- 📋 Advanced health tracking
- 📋 Integration with vet clinics
- 📋 Advanced payment features
- 📋 Multi-language support

---

**Wagr** - Connecting dog lovers worldwide! 🐕❤️