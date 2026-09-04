# NASSU Website

**North America Caribbean Latin America Archdiocese Sunday Schools Union**

A comprehensive web application for the Ethiopia Orthodox Tewahedo Church's Sunday School Union, providing educational resources, community management, donation processing, and administrative tools.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.8.3-blue.svg)

## 🌟 Features

### Public Features
- 🏠 **Home Page** - Organization introduction, core values, services, and events
- 📖 **About** - History, mission, and vision
- 🎓 **Services** - Educational programs and resources
- 👥 **Team** - Team member profiles and leadership
- 📸 **Gallery** - Photo galleries and event images
- 🎥 **Videos** - Educational videos and training materials
- 💰 **Donate** - PayPal payment integration for donations
- 🌐 **Multi-language** - English and Amharic (አማርኛ) support

### User Features (Authenticated)
- 👤 **User Profile** - Manage personal information and settings
- 💳 **Donation History** - Track donations and payment status
- 📚 **Lesson Registration** - Register for Sunday School lessons
- 📋 **Waitlist Management** - Manage lesson registrations

### Admin Features
- 📊 **Dashboard** - Statistics, charts, and analytics
- 👥 **User Management** - Manage users and roles
- 💵 **Payment Management** - Process and track donations
- 📝 **Activity Logs** - Monitor system activities
- ⚙️ **Settings** - System configuration

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **PayPal Developer** account (for payments)
- **Firebase** project (optional, for authentication)

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

3. **Configure environment variables**
   
   Create `.env` file in `backend/` directory:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3001
   PAYPAL_CLIENT_ID=your-paypal-client-id
   PAYPAL_CLIENT_SECRET=your-paypal-client-secret
   JWT_SECRET=your-jwt-secret-key
   ```
   
   Create `.env` file in `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
   ```

4. **Start development servers**
   ```bash
   # From root directory - starts both backend and frontend
   npm run dev
   ```
   
   Or start individually:
   ```bash
   # Backend only (port 5000)
   cd backend
   npm run dev
   
   # Frontend only (port 3001)
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
NASSU/
├── backend/              # Node.js + Express backend
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Express middleware
│   │   └── services/    # Business logic
│   └── .env            # Environment variables
│
├── frontend/            # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React contexts
│   │   ├── services/    # API services
│   │   └── translations/# i18n translations
│   └── public/         # Static assets
│
└── DOCUMENTATION.md    # Complete documentation
```

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Radix UI** - Component library
- **React Router** - Routing
- **React Query** - State management
- **i18next** - Internationalization

### Backend
- **Node.js** - Runtime
- **Express 5.1.0** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **PayPal SDK** - Payment processing

## 🔐 Authentication

### User Registration
1. Navigate to `/signup`
2. Fill in: Full Name, Email, Password
3. Account created with `user` role by default

### Admin Access
Create admin user using the script:
```bash
cd backend
node scripts/makeAdmin.js <admin-email>
```

Or manually update in database:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Then login at `/admin/login`

## 💳 Payment Integration

The application uses **PayPal Checkout SDK** for processing donations.

### Setup
1. Create PayPal Developer account
2. Create app and get Client ID and Secret
3. Add credentials to `.env` files
4. Use sandbox mode for development
5. Switch to live mode for production

### Payment Flow
1. User initiates donation on `/donate` page
2. PayPal order created via API
3. User completes payment on PayPal
4. Payment captured and recorded in database

## 🌍 Multi-language Support

The application supports:
- **English** (default)
- **Amharic** (አማርኛ)

Language switcher available in navigation bar.

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Main Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

**Payments**
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/capture-order/:orderId` - Capture payment
- `GET /api/payments/:paymentId` - Get payment details

**Lessons**
- `GET /api/lessons` - Get all lessons
- `POST /api/lessons/:lessonId/register` - Register for lesson

**Admin** (requires admin role)
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/payments` - Get all payments
- `PUT /api/admin/payments/:id/status` - Update payment status

For complete API documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)

## 🏗️ Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The `dist/` folder contains the production build ready for deployment.

## 🚢 Deployment

### Backend Deployment
- Set production environment variables
- Build: `npm run build`
- Start: `npm start`
- Recommended: Heroku, Railway, Render, AWS EC2

### Frontend Deployment
- Build: `npm run build`
- Deploy `dist/` folder
- Recommended: Vercel, Netlify, AWS S3 + CloudFront

### Environment Variables for Production
- Use production MongoDB URI
- Use live PayPal credentials
- Set `NODE_ENV=production`
- Update `CORS_ORIGIN` to production domain
- Use strong `JWT_SECRET`

## 🧪 Development

### Available Scripts

**Root**
```bash
npm run dev          # Start both backend and frontend
```

**Backend**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
```

**Frontend**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🐛 Troubleshooting

### Common Issues

**Module not found errors**
```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**MongoDB connection errors**
- Verify `MONGODB_URI` is correct
- Check network access in MongoDB Atlas
- Verify database user credentials

**Port already in use**
- Change `PORT` in `.env` file
- Kill process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill
  ```

**Firebase errors**
- Check Firebase credentials in `.env`
- Verify private key format (must include `\n`)
- Ensure Firebase project is active

For more troubleshooting, see [DOCUMENTATION.md](./DOCUMENTATION.md#troubleshooting)

## 📖 Documentation

- **[Complete Documentation](./DOCUMENTATION.md)** - Comprehensive technical documentation
- **[Video Integration Guide](./frontend/VIDEO_INTEGRATION_GUIDE.md)** - Video integration instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

[Specify your license here]

## 👥 Contributors

- [Your Name/Team]

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## 🙏 Acknowledgments

- Ethiopia Orthodox Tewahedo Church
- North America Caribbean Latin America Archdiocese
- All contributors and supporters

---

**Made with ❤️ for the Orthodox Christian Community**


