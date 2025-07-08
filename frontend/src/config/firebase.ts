import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAw6lcYKh8D6gl9y8OyLmVVSTR16GksBnU",
  authDomain: "nassu-authentication.firebaseapp.com",
  projectId: "nassu-authentication",
  storageBucket: "nassu-authentication.firebasestorage.app",
  messagingSenderId: "159437275096",
  appId: "1:159437275096:web:ca524dd719f50687de7cad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;