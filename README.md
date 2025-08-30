# NASSU Project

A comprehensive full-stack web application for NASSU organization, featuring user management, lesson delivery, payment processing, and administrative capabilities.

## 🚀 Project Overview

NASSU is a modern web application built with TypeScript, React, and Node.js that provides a platform for managing educational content, user registrations, donations, and organizational activities.

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + MongoDB
- **Authentication**: JWT + bcrypt
- **Payments**: PayPal integration
- **Real-time**: Socket.io
- **Internationalization**: i18next
- **UI Components**: Radix UI + shadcn/ui

## 📁 Project Structure

```
NASSU/
├── backend/                 # Backend server
│   ├── src/                # Source code
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Database models
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   ├── services/       # External services
│   │   ├── types/          # TypeScript definitions
│   │   └── utils/          # Utility functions
│   ├── dist/               # Compiled JavaScript
│   └── package.json        # Backend dependencies
├── frontend/               # Frontend application
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript definitions
│   │   └── translations/   # i18n files
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
└── package.json            # Root dependencies
```

## 🛠️ Features

### Core Functionality
- **User Management**: Registration, authentication, profile management
- **Lesson System**: Educational content delivery and management
- **Team Management**: Member profiles and organizational structure
- **Payment Processing**: PayPal integration for donations
- **Admin Dashboard**: Comprehensive administrative tools
- **Multilingual Support**: English and Amharic (Ethiopian) languages

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting and DDoS protection
- XSS protection
- CORS configuration
- Account lockout after failed attempts

### User Experience
- Responsive design with Tailwind CSS
- Modern UI components with Radix UI
- Real-time updates with Socket.io
- Form validation with React Hook Form
- Error boundaries and fallbacks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB
- Redis (optional, for caching)
- PayPal Developer Account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NASSU
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` files in the backend directory:
   ```env
   # Backend .env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/nassu
   JWT_SECRET=your_jwt_secret_here
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB
   mongod
   
   # The application will create necessary collections automatically
   ```

### Development

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Application**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Run Both Simultaneously**
   ```bash
   # From root directory
   npm run dev
   ```

### Production Build

1. **Build Backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Lesson Endpoints

- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/lessons` - Create lesson (admin only)
- `PUT /api/lessons/:id` - Update lesson (admin only)
- `DELETE /api/lessons/:id` - Delete lesson (admin only)

### Team Endpoints

- `GET /api/team` - Get team members
- `POST /api/team` - Add team member (admin only)
- `PUT /api/team/:id` - Update team member (admin only)
- `DELETE /api/team/:id` - Remove team member (admin only)

### Payment Endpoints

- `POST /api/payments/create` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Get payment history

### Admin Endpoints

- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user role
- `GET /api/admin/analytics` - Get system analytics
- `POST /api/admin/activity-log` - Log admin activities

## 🔧 Configuration

### Backend Configuration

The backend uses several configuration files located in `backend/src/config/`:

- `db.ts` - Database connection settings
- `env.ts` - Environment variable validation
- `firebase.ts` - Firebase configuration
- `paypal.ts` - PayPal SDK configuration

### Frontend Configuration

- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `i18n.ts` - Internationalization setup

## 🧪 Testing

Currently, the project doesn't have automated tests configured. To add testing:

1. **Backend Testing**
   ```bash
   cd backend
   npm install --save-dev jest @types/jest supertest
   ```

2. **Frontend Testing**
   ```bash
   cd frontend
   npm install --save-dev vitest @testing-library/react
   ```

## 📦 Deployment

### Backend Deployment

1. **Build the application**
   ```bash
   cd backend
   npm run build
   ```

2. **Deploy to your preferred hosting service**
   - Heroku
   - DigitalOcean
   - AWS
   - Google Cloud Platform

3. **Set environment variables** in your hosting platform

### Frontend Deployment

1. **Build the application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy the `dist` folder** to:
   - Netlify
   - Vercel
   - AWS S3
   - GitHub Pages

## 🔒 Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens have expiration times
- Rate limiting prevents abuse
- Input validation on all endpoints
- CORS is properly configured
- Helmet.js provides security headers

## 🌐 Internationalization

The application supports multiple languages:
- English (en)
- Amharic (am)

Language files are located in `frontend/src/translations/`

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- User authentication and management
- Lesson system
- Payment processing
- Admin dashboard
- Multilingual support

## 📋 TODO

- [ ] Add comprehensive test coverage
- [ ] Implement CI/CD pipeline
- [ ] Add API documentation with Swagger
- [ ] Implement caching layer
- [ ] Add monitoring and logging
- [ ] Performance optimization
- [ ] Accessibility improvements

---

**Note**: This is a living document. Please update it as the project evolves.
