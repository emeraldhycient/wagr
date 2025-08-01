# Wagr - Dog Social Platform

A comprehensive dog social platform connecting dog owners, service providers, and dog lovers. Features include socialization events, breeding matchmaking, adoption services, a Pinterest-style gallery, dog walking services, and an e-commerce marketplace for dog accessories.

## 🚀 Features

### Core Platform Features
- **Dog Socialization Hub**: Schedule playdates, parties, and events
- **Breeding Matchmaking**: Connect responsible breeders with AI-powered compatibility matching
- **Adoption Services**: Browse adoptable dogs and submit applications
- **Dog Gallery**: Pinterest-style photo sharing and discovery
- **Service Marketplace**: Book dog walkers, trainers, and other services
- **Tips & Resources**: Expert articles and community Q&A

### E-Commerce Features
- **Product Catalog**: Browse and search dog accessories
- **Shopping Cart**: Add items and manage quantities
- **Secure Checkout**: Stripe-powered payment processing
- **Order Management**: Track orders and delivery status
- **Inventory Tracking**: Real-time stock management

### Admin Dashboard
- **Analytics**: Revenue, user growth, and platform metrics
- **User Management**: View and manage platform users
- **Product Management**: Add, edit, and manage products
- **Order Processing**: Update order status and track shipments
- **System Health**: Monitor platform performance

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **Payments**: Stripe integration
- **File Storage**: AWS S3 (configured)
- **Real-time**: Socket.io for live features

### Mobile App
- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: React Query & Context API
- **UI Components**: Custom components with React Native Elements
- **Storage**: Expo Secure Store & AsyncStorage

### Admin Dashboard
- **Frontend**: HTML5 with Tailwind CSS
- **Charts**: Chart.js for analytics
- **API Client**: Axios

## 📋 Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- Stripe account (for payments)
- AWS account (for file storage)
- Expo CLI (for mobile development)

## 🚀 Getting Started

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wagr-backend
   ```

2. **Install dependencies**
   ```bash
   cd wagr-backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   - Database connection string
   - JWT secret
   - Stripe API keys
   - AWS credentials
   - SMTP settings

4. **Setup database**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed  # Creates admin user and sample data
   ```

5. **Start the backend server**
   ```bash
   npm run start:dev
   ```
   The API will be available at `http://localhost:3000`

### Mobile App Setup

1. **Navigate to mobile app directory**
   ```bash
   cd wagr-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update `src/services/api.ts` with your backend URL

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/emulator**
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

### Admin Dashboard

The admin dashboard is served by the backend at `http://localhost:3000/admin`

Default admin credentials:
- Email: `admin@wagr.com`
- Password: `Admin123!@#`

## 📱 Mobile App Screens

### Authentication
- Login/Register
- User onboarding
- Dog profile creation

### Main Features
- Home dashboard
- Event discovery and creation
- Product browsing and shopping
- Cart and checkout
- Order history
- User profile management

## 🔒 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- SQL injection prevention with Prisma
- XSS protection
- Rate limiting
- Secure password hashing with bcrypt

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/upload-avatar` - Upload profile photo

### Products & E-Commerce
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product details
- `POST /api/cart/items` - Add to cart
- `POST /api/orders` - Create order
- `GET /api/orders` - List user orders

### Admin Endpoints
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - List all users
- `PATCH /api/orders/admin/:id/status` - Update order status

## 🧪 Testing

### Backend Tests
```bash
cd wagr-backend
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run test:cov    # Test coverage
```

### Mobile App Tests
```bash
cd wagr-app
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Run migrations: `npm run prisma:migrate deploy`
4. Start server: `npm run start:prod`

### Mobile App Deployment
1. Update app.json with production configuration
2. Build for production:
   - iOS: `expo build:ios`
   - Android: `expo build:android`
3. Submit to app stores

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@wagr.com or join our Slack channel.

## 🔮 Future Enhancements

- [ ] Video chat for virtual vet consultations
- [ ] AI-powered dog breed identification
- [ ] Geofencing for lost dog alerts
- [ ] Integration with smart collars
- [ ] Multi-language support
- [ ] Dog training video courses
- [ ] Breeding genetics calculator
- [ ] Virtual dog shows

---

Built with ❤️ for dog lovers everywhere 🐕