import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    console.error('❌ MONGODB_URI not found in environment variables. Database features will be unavailable.');
    return;
  }

  const maskedUri = mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:*****@');
  console.log(`🔗 Attempting to connect to MongoDB: ${maskedUri}`);

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.db?.databaseName || 'Database connected'}`);

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected. Reconnecting...');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed through app termination');
      process.exit(0);
    });

    return mongoose;
  } catch (error) {
    console.error('❌ Initial MongoDB connection failed:', error instanceof Error ? error.message : error);
    console.warn('⚠️  The server will continue running. Please check your MONGODB_URI and MongoDB Atlas Network Access (whitelist 0.0.0.0/0).');
  }
};

export default connectDB;
