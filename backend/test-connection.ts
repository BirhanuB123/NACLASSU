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
  
  // Simple connection test
  try {
    console.log('\n1. Testing basic connection...');
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Basic connection successful!');
    
    // Ensure the database connection is established
    if (!mongoose.connection.db) {
      throw new Error('Database connection established but db instance is not available');
    }
    
    // Test if we can ping the database
    console.log('\n2. Testing database ping...');
    const adminDb = mongoose.connection.db.admin();
    const pingResult = await adminDb.ping();
    console.log('✅ Database ping successful!', pingResult);
    
    // List all collections
    console.log('\n3. Listing collections...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in database:', collections.map((c: { name: string }) => c.name));
    
    console.log('\n🎉 All tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    
    // More detailed error information
    if (error instanceof Error) {
      console.error('\nError Details:');
      console.error('Name:', error.name);
      console.error('Message:', error.message);
      
      if ('code' in error) {
        console.error('Error Code:', error.code);
      }
      
      if (error.name === 'MongooseServerSelectionError') {
        console.error('\n⚠️  This typically indicates a network or authentication issue.');
        console.error('Please check:');
        console.error('1. Your internet connection');
        console.error('2. MongoDB Atlas IP whitelist');
        console.error('3. Database username/password');
      }
    }
    
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
}

testConnection();
