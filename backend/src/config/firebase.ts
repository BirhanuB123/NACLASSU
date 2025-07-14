import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase admin initialization error', error);
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
