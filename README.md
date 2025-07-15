
This project is built with:

- Vite
- TypeScript
- React
- Tailwind CSS
- Backend with Node.js/Express and MongoDB/Mongoose
- Authentication with Firebase and Mongoose

## Deployment Instructions (Render.com)

### Prerequisites
- A Render.com account
- GitHub account with repository access
- MongoDB Atlas database (or your preferred MongoDB provider)

### Backend Setup

1. **Environment Variables**:
   Create a `.env` file in the `backend` directory with the following variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   ```

2. **Deploy to Render**:
   - Push your code to a GitHub repository
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - Name: `nassu-backend`
     - Region: Choose the one closest to your users
     - Branch: `main` (or your preferred branch)
     - Build Command: `cd backend && npm install && npm run build`
     - Start Command: `npm start`
     - Add your environment variables from the `.env` file
   - Click "Create Web Service"

### Frontend Setup

1. **Environment Variables**:
   Create a `.env` file in the `frontend` directory with:
   ```
   VITE_API_URL=https://nassu-backend.onrender.com
   ```
   (Update with your actual backend URL after deployment)

2. **Deploy to Render**:
   - In the Render Dashboard, click "New" and select "Static Site"
   - Connect your GitHub repository
   - Configure the site:
     - Name: `nassu-frontend`
     - Branch: `main` (or your preferred branch)
     - Build Command: `cd frontend && npm install && npm run build`
     - Publish Directory: `frontend/dist`
     - Add environment variables
   - Click "Create Static Site"

### Post-Deployment
- Update any CORS settings in your backend to allow requests from your frontend URL
- Test all API endpoints to ensure they're working correctly
- Set up custom domains if needed through Render's dashboard

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Make sure to set up the following environment variables:

### Backend (`.env` in backend directory)
- `PORT`: Server port (default: 10000)
- `MONGODB_URI`: MongoDB connection string
- `FIREBASE_*`: Firebase authentication credentials

### Frontend (`.env` in frontend directory)
- `VITE_API_URL`: URL of your deployed backend API
