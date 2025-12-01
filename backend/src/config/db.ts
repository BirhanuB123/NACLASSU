import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    console.error('❌ MongoDB connection string not found in environment variables');
    process.exit(1);
  }

  const maskedUri = mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:*****@');
  console.log(`🔗 Attempting to connect to MongoDB: ${maskedUri}`);

  // Try both SRV and standard connection
  const connectionAttempts = [
    { type: 'SRV', uri: mongoUri },
    { 
      type: 'Standard', 
      uri: mongoUri.includes('mongodb+srv://') 
        ? mongoUri.replace('mongodb+srv://', 'mongodb://')
                 .replace('@cluster0.fhnuwkr.mongodb.net/', '@cluster0.fhnuwkr.mongodb.net:27017/')
        : mongoUri
    }
  ];

  let lastError: Error | null = null;

  for (const attempt of connectionAttempts) {
    try {
      console.log(`\n🔍 Attempting ${attempt.type} connection...`);
      
      const connectionOptions: mongoose.ConnectOptions = {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 15000,
        maxPoolSize: 5,
        retryWrites: true,
        w: 'majority',
        retryReads: true,
      };

      // Only add ssl options if not in development
      if (process.env.NODE_ENV !== 'development') {
        Object.assign(connectionOptions, {
          ssl: true,
          tlsAllowInvalidCertificates: false
        });
      }

      const conn = await mongoose.connect(attempt.uri, connectionOptions);
      
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      console.log(`📊 Database: ${conn.connection.db?.databaseName || 'Database name not available'}`);
      
      // Connection events
      mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to DB');
      });
      
      mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
      });
      
      // Handle application termination
      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('Mongoose connection closed through app termination');
        process.exit(0);
      });
      
      return mongoose;
      
    } catch (error) {
      lastError = error as Error;
      console.error(`❌ ${attempt.type} connection failed:`, error instanceof Error ? error.message : 'Unknown error');
      
      // If this isn't the last attempt, wait a bit before trying the next one
      if (attempt !== connectionAttempts[connectionAttempts.length - 1]) {
        console.log('⏳ Waiting 2 seconds before next attempt...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  
  // If we get here, all connection attempts failed
  console.error('❌ All connection attempts failed');
  if (lastError) {
    console.error('Last error:', lastError);
  }
  process.exit(1);
};

export default connectDB;
