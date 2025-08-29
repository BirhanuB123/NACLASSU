import axios from 'axios';
import { auth } from '@/config/firebase';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
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