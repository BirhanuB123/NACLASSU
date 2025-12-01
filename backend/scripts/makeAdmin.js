
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nassu';

// User schema (simplified version)
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ['user', 'admin'] },
  lastLogin: { type: Date },
  failedLoginAttempts: { type: Number, default: 0 },
  isLocked: { type: Boolean, default: false },
  lockUntil: { type: Date }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

async function makeAdmin(email) {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log(`🔍 Looking for user: ${email}`);
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(`\n❌ User with email "${email}" not found in database`);
      console.log('\n💡 Make sure the user has signed up first!');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log(`\n📋 User found:`);
    console.log(`   Name: ${user.fullName}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Current Role: ${user.role}`);

    if (user.role === 'admin') {
      console.log(`\n✅ User is already an admin!`);
      await mongoose.connection.close();
      process.exit(0);
    }

    console.log(`\n🔄 Updating role to admin...`);
    user.role = 'admin';
    await user.save();

    console.log(`\n✅ SUCCESS! ${user.fullName} is now an admin!`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. User should log out of the application`);
    console.log(`   2. User should log back in`);
    console.log(`   3. User can now access: http://localhost:3001/admin`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

async function removeAdmin(email) {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log(`🔍 Looking for user: ${email}`);
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(`\n❌ User with email "${email}" not found in database`);
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log(`\n📋 User found:`);
    console.log(`   Name: ${user.fullName}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Current Role: ${user.role}`);

    if (user.role === 'user') {
      console.log(`\n✅ User is already a regular user!`);
      await mongoose.connection.close();
      process.exit(0);
    }

    console.log(`\n🔄 Removing admin privileges...`);
    user.role = 'user';
    await user.save();

    console.log(`\n✅ SUCCESS! ${user.fullName} is now a regular user!`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

async function listAdmins() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    console.log('🔍 Finding all admin users...\n');
    const admins = await User.find({ role: 'admin' });

    if (admins.length === 0) {
      console.log('❌ No admin users found in the database');
      console.log('\n💡 Use this script to create an admin:');
      console.log('   node scripts/makeAdmin.js user@example.com');
    } else {
      console.log(`✅ Found ${admins.length} admin user(s):\n`);
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.fullName}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Created: ${admin.createdAt?.toLocaleDateString()}`);
        console.log(`   Last Login: ${admin.lastLogin ? admin.lastLogin.toLocaleDateString() : 'Never'}`);
        console.log('');
      });
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];
const email = args[1];

if (!command) {
  console.log('📖 Usage:');
  console.log('   Make user admin:    node scripts/makeAdmin.js make user@example.com');
  console.log('   Remove admin:       node scripts/makeAdmin.js remove user@example.com');
  console.log('   List all admins:    node scripts/makeAdmin.js list');
  console.log('');
  console.log('📖 Short version (make admin):');
  console.log('   node scripts/makeAdmin.js user@example.com');
  process.exit(1);
}

// Handle commands
if (command === 'list') {
  listAdmins();
} else if (command === 'make') {
  if (!email) {
    console.log('❌ Please provide an email address');
    console.log('   Usage: node scripts/makeAdmin.js make user@example.com');
    process.exit(1);
  }
  makeAdmin(email);
} else if (command === 'remove') {
  if (!email) {
    console.log('❌ Please provide an email address');
    console.log('   Usage: node scripts/makeAdmin.js remove user@example.com');
    process.exit(1);
  }
  removeAdmin(email);
} else {
  // If first argument looks like an email, treat it as "make" command
  if (command.includes('@')) {
    makeAdmin(command);
  } else {
    console.log('❌ Invalid command. Use: make, remove, or list');
    process.exit(1);
  }
}

