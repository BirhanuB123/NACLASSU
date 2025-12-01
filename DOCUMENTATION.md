# NACLASSU Website - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Features](#features)
6. [Setup & Installation](#setup--installation)
7. [Environment Configuration](#environment-configuration)
8. [API Documentation](#api-documentation)
9. [Frontend Components](#frontend-components)
10. [Backend Architecture](#backend-architecture)
11. [Database Models](#database-models)
12. [Authentication & Security](#authentication--security)
13. [Payment Integration](#payment-integration)
14. [Admin Panel](#admin-panel)
15. [Deployment](#deployment)
16. [Troubleshooting](#troubleshooting)

---

## Project Overview

**NACLASSU** (North America Caribbean Latin America Archdiocese Sunday Schools Union) is a comprehensive web application for the Ethiopia Orthodox Tewahedo Church's Sunday School Union. The platform provides educational resources, community management, donation processing, and administrative tools for managing the organization.

### Purpose
- Support Orthodox Christian education
- Manage Sunday School programs and lessons
- Process donations and payments
- Provide community resources and information
- Administer user accounts and content

### Key Capabilities
- Multi-language support (English/Amharic)
- User authentication and authorization
- Payment processing via PayPal
- Real-time communication via WebSockets
- Admin dashboard for management
- Content management for lessons, team members, and events

---

## Architecture

### System Architecture
```
┌─────────────────┐
│   Frontend      │  React + TypeScript + Vite
│   (Port 3001)   │  TailwindCSS + Radix UI
└────────┬────────┘
         │ HTTP/WebSocket
         │
┌────────▼────────┐
│   Backend       │  Node.js + Express + TypeScript
│   (Port 5000)   │  Socket.io + MongoDB
└────────┬────────┘
         │
┌────────▼────────┐
│   Database      │  MongoDB Atlas
│                 │  Firebase (Auth)
└─────────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Routing**: React Router DOM 6.26.2
- **State Management**: React Query (TanStack Query) 5.56.2
- **UI Components**: 
  - Radix UI (Accessible component primitives)
  - TailwindCSS 3.4.11
  - shadcn/ui components
- **Internationalization**: i18next 25.2.1 (English/Amharic)
- **Forms**: React Hook Form 7.53.0 + Zod 3.23.8
- **Payments**: PayPal React SDK 8.8.3
- **Real-time**: Socket.io Client 4.8.1
- **Styling**: TailwindCSS + CSS Modules

#### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.1.0
- **Language**: TypeScript 5.8.3
- **Database**: 
  - MongoDB 8.16.1 (via Mongoose)
  - Firebase Admin SDK 13.4.0 (Authentication)
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Security**: 
  - Helmet 8.1.0
  - Express Rate Limit 7.5.0
  - CORS 2.8.5
- **Payments**: PayPal Checkout Server SDK 1.0.3
- **Real-time**: Socket.io 4.8.1
- **Logging**: Winston 3.17.0

---

## Project Structure

```
NACLASSU/
├── backend/                    # Backend server
│   ├── src/
│   │   ├── app.ts             # Express app configuration
│   │   ├── server.ts          # Server entry point
│   │   ├── config/            # Configuration files
│   │   │   ├── db.ts          # MongoDB connection
│   │   │   ├── env.ts         # Environment variables
│   │   │   ├── firebase.ts    # Firebase Admin setup
│   │   │   └── paypal.ts      # PayPal configuration
│   │   ├── controllers/       # Route controllers
│   │   │   ├── admin/         # Admin controllers
│   │   │   ├── authController.ts
│   │   │   ├── payment.controller.ts
│   │   │   ├── lessonController.ts
│   │   │   ├── teamController.ts
│   │   │   └── userController.ts
│   │   ├── middleware/        # Express middleware
│   │   │   ├── auth.ts        # Authentication middleware
│   │   │   ├── authMiddleware.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── security.ts    # Security middleware
│   │   ├── models/            # Mongoose models
│   │   │   ├── User.model.ts
│   │   │   ├── Payment.model.ts
│   │   │   ├── Lesson.model.ts
│   │   │   ├── TeamMember.model.ts
│   │   │   ├── ActivityLog.model.ts
│   │   │   └── Photo.ts
│   │   ├── routes/            # API routes
│   │   │   ├── admin.routes.ts
│   │   │   ├── auth.route.ts
│   │   │   ├── payment.routes.ts
│   │   │   ├── lesson.route.ts
│   │   │   ├── team.ts
│   │   │   └── user.route.ts
│   │   ├── services/          # Business logic services
│   │   │   └── socket.service.ts
│   │   ├── types/             # TypeScript type definitions
│   │   │   ├── api.ts
│   │   │   └── express.d.ts
│   │   └── utils/             # Utility functions
│   │       └── generateToken.ts
│   ├── dist/                  # Compiled JavaScript
│   ├── .env                   # Environment variables (not in git)
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # Frontend application
│   ├── src/
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   ├── pages/             # Page components
│   │   │   ├── Index.tsx      # Home page
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Videos.tsx
│   │   │   ├── Donate.tsx
│   │   │   ├── JoinUs.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminUsers.tsx
│   │   │   ├── AdminDonations.tsx
│   │   │   └── AdminSettings.tsx
│   │   ├── components/       # Reusable components
│   │   │   ├── ui/            # UI primitives (shadcn)
│   │   │   ├── home/          # Home page components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PayPalProvider.tsx
│   │   ├── context/           # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── LanguageContext.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API services
│   │   │   ├── api.ts
│   │   │   ├── adminApi.ts
│   │   │   └── userService.ts
│   │   ├── lib/               # Utility libraries
│   │   │   ├── api.ts
│   │   │   └── utils.ts
│   │   ├── translations/      # i18n translations
│   │   │   └── index.ts
│   │   └── types/             # TypeScript types
│   ├── public/                # Static assets
│   │   ├── documents/         # PDF documents
│   │   ├── images/            # Image assets
│   │   └── flags/             # Flag icons
│   ├── package.json
│   └── vite.config.ts
│
└── package.json               # Root package.json
```

---

## Features

### Public Features
1. **Home Page**
   - Hero section with organization introduction
   - Welcome message
   - Core values display
   - Services overview
   - Highlighted events
   - Call-to-action sections

2. **About Page**
   - Organization history and mission
   - Vision and goals
   - Leadership information

3. **Services Page**
   - Educational programs
   - Training opportunities
   - Community support services
   - Parish resources

4. **Team Page**
   - Team member profiles
   - Leadership information
   - Contact details

5. **Gallery**
   - Photo galleries
   - Event images
   - Community photos

6. **Videos**
   - Educational videos
   - Event recordings
   - Training materials

7. **Donate Page**
   - PayPal payment integration
   - Donation forms
   - Payment history (for logged-in users)

8. **Join Us**
   - Registration form
   - Membership information

9. **Multi-language Support**
   - English
   - Amharic (አማርኛ)
   - Language switcher in navigation

### User Features (Authenticated)
1. **User Profile**
   - View and edit profile
   - Update personal information
   - Change password

2. **Donation Management**
   - View donation history
   - Track payment status
   - Download receipts

3. **Lesson Registration**
   - Browse available lessons
   - Register for lessons
   - View registered lessons
   - Waitlist management

### Admin Features
1. **Admin Dashboard**
   - Statistics overview
   - User growth charts
   - Donation trends
   - Recent activities
   - Quick actions

2. **User Management**
   - View all users
   - User details
   - Role management
   - Account status

3. **Payment Management**
   - View all payments
   - Payment statistics
   - Update payment status
   - Refund processing
   - Export payment data

4. **Activity Logs**
   - System activity tracking
   - User action logs
   - Admin activity monitoring

5. **Settings**
   - System configuration
   - Application settings

---

## Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- PayPal Developer account (for payments)
- Firebase project (optional, for authentication)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NASSU
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure environment variables**
   - See [Environment Configuration](#environment-configuration) section

6. **Start development servers**
   ```bash
   # From root directory
   npm run dev
   ```
   This will start both backend (port 5000) and frontend (port 3001) concurrently.

### Individual Server Commands

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

**Build for production:**
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

---

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nassu?retryWrites=true&w=majority

# Firebase Configuration (Optional)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3001

# PayPal Configuration
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox  # or 'live' for production

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Redis Configuration (Optional, for rate limiting)
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
```

### Getting Configuration Values

1. **MongoDB URI**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string from "Connect" button
   - Replace `<password>` with your database password

2. **Firebase Credentials**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a project or select existing
   - Go to Project Settings > Service Accounts
   - Generate new private key (JSON file)
   - Extract values from JSON file

3. **PayPal Credentials**
   - Sign up at [PayPal Developer](https://developer.paypal.com/)
   - Create a new app
   - Get Client ID and Secret from app dashboard

---

## API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Authentication
Most endpoints require authentication via JWT token. Include token in headers:
```
Authorization: Bearer <your-jwt-token>
```

### API Endpoints

#### Authentication Routes (`/api/auth`)

**POST `/api/auth/register`**
- Register a new user
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user"
    }
  }
  ```

**POST `/api/auth/login`**
- Login user
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response:** Same as register

**GET `/api/auth/me`**
- Get current user profile
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "user": {
      "id": "user-id",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user"
    }
  }
  ```

#### Payment Routes (`/api/payments`)

**POST `/api/payments/create-order`**
- Create PayPal payment order
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "amount": 50.00,
    "currency": "USD",
    "description": "Donation to NASSU"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "orderId": "paypal-order-id",
    "paymentId": "payment-id"
  }
  ```

**POST `/api/payments/capture-order/:orderId`**
- Capture PayPal payment
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "payment": {
      "id": "payment-id",
      "status": "COMPLETED",
      "amount": 50.00
    }
  }
  ```

**GET `/api/payments/:paymentId`**
- Get payment details
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "payment": {
      "id": "payment-id",
      "status": "COMPLETED",
      "amount": 50.00,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

#### Lesson Routes (`/api/lessons`)

**GET `/api/lessons`**
- Get all lessons
- **Response:**
  ```json
  {
    "success": true,
    "lessons": [
      {
        "id": "lesson-id",
        "title": "Lesson Title",
        "content": "Lesson content...",
        "date": "2024-01-01T00:00:00.000Z",
        "maxParticipants": 20,
        "registrations": []
      }
    ]
  }
  ```

**POST `/api/lessons/:lessonId/register`**
- Register for a lesson
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Registered successfully",
    "status": "registered"
  }
  ```

#### Team Routes (`/api/team`)

**GET `/api/team`**
- Get all team members
- **Response:**
  ```json
  {
    "success": true,
    "team": [
      {
        "id": "member-id",
        "name": "Member Name",
        "role": "Role",
        "bio": "Biography...",
        "photo": "photo-url"
      }
    ]
  }
  ```

#### Admin Routes (`/api/admin`)

All admin routes require admin role.

**GET `/api/admin/dashboard/stats`**
- Get dashboard statistics
- **Response:**
  ```json
  {
    "success": true,
    "stats": {
      "totalUsers": 100,
      "totalPayments": 50,
      "totalAmount": 5000.00,
      "activeUsers": 75
    }
  }
  ```

**GET `/api/admin/users`**
- Get all users
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "user-id",
        "email": "user@example.com",
        "fullName": "User Name",
        "role": "user",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

**GET `/api/admin/payments`**
- Get all payments
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status (PENDING, COMPLETED, FAILED, etc.)
- **Response:**
  ```json
  {
    "success": true,
    "payments": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
  ```

**PUT `/api/admin/payments/:id/status`**
- Update payment status
- **Body:**
  ```json
  {
    "status": "COMPLETED"
  }
  ```

**GET `/api/admin/activities`**
- Get activity logs
- **Response:**
  ```json
  {
    "success": true,
    "activities": [
      {
        "id": "activity-id",
        "action": "USER_LOGIN",
        "userId": "user-id",
        "details": {},
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

### Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Frontend Components

### Page Components

1. **Index.tsx** - Home page with hero, welcome, values, services sections
2. **About.tsx** - Organization information
3. **Services.tsx** - Services and programs
4. **Team.tsx** - Team member profiles
5. **Gallery.tsx** - Photo galleries
6. **Videos.tsx** - Video content
7. **Donate.tsx** - Donation page with PayPal integration
8. **JoinUs.tsx** - Registration page
9. **Login.tsx** - User login
10. **Signup.tsx** - User registration
11. **ProfilePage.tsx** - User profile management
12. **AdminDashboard.tsx** - Admin dashboard
13. **AdminUsers.tsx** - User management
14. **AdminDonations.tsx** - Payment management
15. **AdminSettings.tsx** - System settings

### Reusable Components

Located in `src/components/`:
- **Navbar.tsx** - Navigation bar with language switcher
- **Footer.tsx** - Site footer
- **PayPalProvider.tsx** - PayPal SDK provider
- **ErrorBoundary.tsx** - Error boundary component
- **ScrollToTop.tsx** - Scroll to top on route change
- **ui/** - shadcn/ui component library

### Context Providers

1. **AuthContext** - User authentication state
2. **LanguageContext** - i18n language management

---

## Backend Architecture

### Controllers
Handle business logic and request/response:
- `authController.ts` - Authentication logic
- `payment.controller.ts` - Payment processing
- `lessonController.ts` - Lesson management
- `teamController.ts` - Team member management
- `userController.ts` - User management
- `admin/*` - Admin-specific controllers

### Middleware
1. **auth.ts** - JWT authentication verification
2. **authMiddleware.ts** - Additional auth checks
3. **admin** - Admin role verification
4. **errorHandler.ts** - Global error handling
5. **security.ts** - Security middleware (rate limiting, XSS protection, CORS)

### Services
1. **socket.service.ts** - WebSocket service for real-time features

### Models (Mongoose Schemas)

1. **User Model**
   - Fields: fullName, email, password, role, lastLogin, failedLoginAttempts, isLocked
   - Methods: comparePassword, handleFailedLogin, resetFailedLoginAttempts

2. **Payment Model**
   - Fields: userId, amount, status, paypalOrderId, paypalCaptureId, currency, description, metadata
   - Status enum: PENDING, COMPLETED, FAILED, REFUNDED, CANCELLED

3. **Lesson Model**
   - Fields: title, content, date, maxParticipants, registrations
   - Methods: registerUser

4. **TeamMember Model**
   - Fields: name, role, bio, photo, contact info

5. **ActivityLog Model**
   - Fields: action, userId, details, timestamp

---

## Database Models

### User Schema
```typescript
{
  fullName: String (required)
  email: String (required, unique, lowercase)
  password: String (required, hashed)
  role: String (enum: ['user', 'admin'], default: 'user')
  lastLogin: Date
  failedLoginAttempts: Number (default: 0)
  isLocked: Boolean (default: false)
  lockUntil: Date
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### Payment Schema
```typescript
{
  userId: ObjectId (ref: 'User', required)
  amount: Number (required)
  status: String (enum: PaymentStatus, default: 'PENDING')
  paypalOrderId: String (required, unique)
  paypalCaptureId: String
  currency: String (default: 'USD')
  description: String
  metadata: Object
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### Lesson Schema
```typescript
{
  title: String (required)
  content: String (required)
  date: Date (required)
  maxParticipants: Number (default: 20)
  registrations: [{
    userId: ObjectId (ref: 'User')
    status: String (enum: ['registered', 'waitlisted', 'cancelled'])
    registeredAt: Date
  }]
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

---

## Authentication & Security

### Authentication Flow

1. **Registration**
   - User provides email, password, fullName
   - Password is hashed with bcrypt (salt rounds: 10)
   - JWT token generated and returned
   - User stored in MongoDB

2. **Login**
   - Email and password verified
   - Failed login attempts tracked
   - Account locked after 5 failed attempts (24 hours)
   - JWT token generated on success

3. **Token Verification**
   - JWT token verified on protected routes
   - Token includes: userId, email, role
   - Expiration: 7 days (configurable)

### Security Features

1. **Password Security**
   - Bcrypt hashing with salt
   - Minimum password requirements (enforced in frontend)
   - Password not returned in API responses

2. **Account Protection**
   - Failed login attempt tracking
   - Account locking mechanism
   - Lock duration: 24 hours

3. **API Security**
   - Helmet.js for HTTP headers
   - CORS configuration
   - Rate limiting (express-rate-limit)
   - XSS protection
   - Input validation

4. **Middleware Protection**
   - Authentication required for protected routes
   - Admin role required for admin routes
   - Request validation

---

## Payment Integration

### PayPal Integration

The application uses PayPal Checkout SDK for payment processing.

**Flow:**
1. User initiates donation on frontend
2. Frontend calls `/api/payments/create-order`
3. Backend creates PayPal order
4. User completes payment on PayPal
5. Frontend calls `/api/payments/capture-order/:orderId`
6. Backend captures payment and updates database

**Payment Statuses:**
- `PENDING` - Order created, awaiting payment
- `COMPLETED` - Payment successful
- `FAILED` - Payment failed
- `REFUNDED` - Payment refunded
- `CANCELLED` - Payment cancelled

**Configuration:**
- Sandbox mode for development
- Live mode for production
- Client ID and Secret required

---

## Admin Panel

### Access
- Admin login at `/admin/login`
- Requires admin role in user account
- Use script to create admin: `backend/scripts/makeAdmin.js`

### Features

1. **Dashboard**
   - Statistics overview
   - User growth charts
   - Donation trends
   - Recent activities
   - Quick metrics

2. **User Management**
   - View all users
   - User details
   - Role management
   - Account status

3. **Payment Management**
   - View all payments
   - Filter by status
   - Update payment status
   - Payment statistics
   - Export functionality

4. **Activity Logs**
   - System activity tracking
   - User actions
   - Admin actions
   - Filterable logs

5. **Settings**
   - System configuration
   - Application settings

### Creating Admin User

Run the admin creation script:
```bash
cd backend
node scripts/makeAdmin.js <email>
```

Or manually update user in database:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

---

## Deployment

### Backend Deployment

1. **Build the project**
   ```bash
   cd backend
   npm run build
   ```

2. **Set environment variables** on hosting platform

3. **Start the server**
   ```bash
   npm start
   ```

**Recommended Platforms:**
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

### Frontend Deployment

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy `dist/` folder**

**Recommended Platforms:**
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Environment Variables for Production

Update `.env` files with production values:
- Use production MongoDB URI
- Use live PayPal credentials
- Set `NODE_ENV=production`
- Update CORS_ORIGIN to production domain
- Use strong JWT_SECRET

### Database Setup

1. Create MongoDB Atlas cluster
2. Configure network access (whitelist IPs)
3. Create database user
4. Get connection string
5. Update MONGODB_URI in environment variables

---

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Run `npm install` in both backend and frontend
   - Clear `node_modules` and reinstall

2. **MongoDB connection errors**
   - Verify MONGODB_URI is correct
   - Check network access in MongoDB Atlas
   - Verify database user credentials

3. **Firebase errors**
   - Check Firebase credentials in .env
   - Verify private key format (must include \n)
   - Ensure Firebase project is active

4. **PayPal payment errors**
   - Verify PayPal credentials
   - Check PayPal mode (sandbox/live)
   - Verify CORS settings

5. **Port already in use**
   - Change PORT in .env
   - Kill process using the port

6. **Authentication errors**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Verify user role in database

### Debug Mode

Enable debug logging:
```bash
# Backend
DEBUG=* npm run dev

# Frontend
# Check browser console for errors
```

### Logs

Backend logs are handled by Winston. Check console output for:
- Server startup messages
- Database connection status
- API request logs
- Error messages

---

## Additional Resources

### Documentation Files
- `VIDEO_INTEGRATION_GUIDE.md` - Video integration guide (in frontend/)

### Scripts
- `backend/scripts/makeAdmin.js` - Create admin user

### Support
For issues or questions, check:
- GitHub Issues (if repository is public)
- Project documentation
- Code comments

---

## Version Information

- **Backend**: 1.0.0
- **Frontend**: 0.0.0
- **Node.js**: v18+
- **React**: 18.3.1
- **TypeScript**: 5.8.3

---

## License

[Specify your license here]

---

## Contributors

[Add contributor information]

---

**Last Updated**: January 2024

