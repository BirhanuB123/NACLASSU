import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // Get Firebase config from environment variables
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;

    // Check if Firebase credentials are provided and valid
    if (!projectId || !privateKey || !clientEmail) {
      console.warn('⚠️  Firebase configuration not provided. Firebase features will be disabled.');
      console.warn('   To enable Firebase, set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env file');
    } else if (
      projectId === 'your-firebase-project-id' || 
      clientEmail === 'your-service-account@your-project.iam.gserviceaccount.com' ||
      privateKey.includes('YOUR_PRIVATE_KEY_HERE')
    ) {
      console.warn('⚠️  Firebase configuration contains placeholder values. Firebase features will be disabled.');
      console.warn('   Please update your .env file with actual Firebase credentials to enable Firebase features');
    } else {
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
    }
  } catch (error) {
    console.error('❌ Firebase admin initialization error:', error instanceof Error ? error.message : error);
    console.warn('⚠️  Firebase features will be disabled. Please check your Firebase configuration.');
    // Don't throw the error - let the app continue without Firebase
  }
}

interface DecodedToken {
  uid: string;
  email?: string;
  name?: string;
}

export const verifyIdToken = async (token: string): Promise<DecodedToken | null> => {
  try {
    if (!admin.apps.length) {
      console.warn('⚠️  Firebase not initialized. Token verification skipped.');
      return null;
    }
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

export const getAuth = () => {
  if (!admin.apps.length) {
    throw new Error('Firebase not initialized. Please configure Firebase credentials.');
  }
  return admin.auth();
};

export default admin;
