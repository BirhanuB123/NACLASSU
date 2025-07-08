import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

async function testConnection() {
  const mongoUri = process.env.MONGO_URI;
  
  if (!mongoUri) {
    console.error('❌ MongoDB connection string not found in environment variables');
    process.exit(1);
  }

  console.log('🔍 Testing MongoDB connection...');
  
  try {
    console.log('\n1. Attempting to connect to MongoDB...');
    
    const connectionOptions = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000, // 10 seconds
    };
    
    await mongoose.connect(mongoUri, connectionOptions);
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test basic database operations
    console.log('\n2. Testing database operations...');
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`✅ Found ${collections.length} collections in the database`);
    
    console.log('\n🎉 Connection test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Connection test failed!');
    
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      
      // Provide helpful troubleshooting tips based on error type
      if (error.name === 'MongooseServerSelectionError') {
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Check your internet connection');
        console.log('2. Verify your IP is whitelisted in MongoDB Atlas');
        console.log('3. Ensure your MongoDB credentials are correct');
        console.log('4. Check if your database is running and accessible');
      }
    }
    
    process.exit(1);
  } finally {
    // Always close the connection
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
}

// Run the test
testConnection().catch(console.error);
