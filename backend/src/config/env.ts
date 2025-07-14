import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Find the project root directory
const findEnvFile = (dir: string): string | null => {
  const envPath = path.join(dir, '.env');
  if (fs.existsSync(envPath)) return envPath;
  
  const parentDir = path.dirname(dir);
  if (parentDir === dir) return null; // Reached root
  
  return findEnvFile(parentDir);
};

// Try to find .env file in current or parent directories
const envPath = findEnvFile(__dirname);

if (envPath) {
  console.log(`🔍 Loading environment variables from: ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.warn('⚠️  No .env file found. Using process.env only');
  dotenv.config(); // Still try to load from process.env
}

// Log loaded environment variables (except sensitive ones)
console.log('🔧 Environment Configuration:');
console.log(`   - FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'}`);
console.log(`   - FIREBASE_CLIENT_EMAIL: ${process.env.FIREBASE_CLIENT_EMAIL ? '✅ Set' : '❌ Missing'}`);
console.log(`   - MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
console.log(`   - PORT: ${process.env.PORT || '5000 (default)'}`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development (default)'}`);

// Validate required environment variables
const requiredEnvVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_CLIENT_EMAIL',
  'MONGODB_URI'
];

let hasMissingVars = false;
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    hasMissingVars = true;
  }
}

if (hasMissingVars) {
  console.error('💥 Missing required environment variables. Please check your .env file.');
  process.exit(1);
}

console.log('✅ Environment configuration loaded successfully');

// Helper to safely get environment variables
const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || defaultValue as string;
};

export default {
  mongodb: {
    uri: getEnv('MONGODB_URI')
  },
  port: parseInt(getEnv('PORT', '5000'), 10),
  corsOrigin: getEnv('CORS_ORIGIN', 'http://localhost:3000'),
  nodeEnv: getEnv('NODE_ENV', 'development')
};
