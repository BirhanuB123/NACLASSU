import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // Get Firebase config from environment variables
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;

    // Validate required environment variables
    if (!projectId || !privateKey || !clientEmail) {
      throw new Error('❌ Missing required Firebase configuration in environment variables');
    }

    // Ensure private key has proper line breaks
    privateKey = privateKey.replace(/\\n/g, '\n');

    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey
      } as admin.ServiceAccount),
      databaseURL: `https://${projectId}.firebaseio.com`
    });
    
    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('❌ Firebase admin initialization error:', error instanceof Error ? error.message : error);
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack);
    }
    // Re-throw the error to prevent the app from starting with invalid Firebase config
    throw error;
  }
}

interface DecodedToken {
  uid: string;
  email?: string;
  name?: string;
}

export const verifyIdToken = async (token: string): Promise<DecodedToken | null> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return { 
      uid: decodedToken.uid, 
      email: decodedToken.email || undefined,
      name: decodedToken.name || undefined
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export const getAuth = () => admin.auth();

export default admin;
