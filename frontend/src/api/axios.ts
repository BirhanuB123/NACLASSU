import axios from 'axios';
import { auth } from '@/config/firebase';

// Use relative URL which will be proxied by Vite
// Vite proxy: /api -> http://localhost:5000/api
// This avoids CORS issues and double /api paths
const API = axios.create({
  baseURL: '/api',
});

API.interceptors.request.use(async (req) => {
  try {
    // Get the current Firebase user
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Get the Firebase ID token
      const idToken = await currentUser.getIdToken();
      if (idToken) {
        req.headers.Authorization = `Bearer ${idToken}`;
      }
    }
  } catch (error) {
    console.error('Error getting Firebase ID token:', error);
  }
  return req;
});

export default API;