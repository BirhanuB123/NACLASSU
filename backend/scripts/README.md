# Admin Management Scripts

This directory contains utility scripts for managing admin users in the NASSU application.

## 🎯 Quick Start

### Make a user an admin:
```bash
cd backend
node scripts/makeAdmin.js user@example.com
```

### List all admins:
```bash
node scripts/makeAdmin.js list
```

### Remove admin privileges:
```bash
node scripts/makeAdmin.js remove user@example.com
```

---

## 📋 Prerequisites

1. **User must be signed up first** - The user needs to create an account through the signup page
2. **MongoDB must be running** - Make sure your MongoDB server is running
3. **Backend .env configured** - Your `backend/.env` file should have the correct `MONGODB_URI`

---

## 🔧 Detailed Usage

### 1. Make User Admin

**Command:**
```bash
node scripts/makeAdmin.js make user@example.com
```

**Short version:**
```bash
node scripts/makeAdmin.js user@example.com
```

**Output:**
```
🔌 Connecting to MongoDB...
✅ Connected to MongoDB

🔍 Looking for user: user@example.com

📋 User found:
   Name: John Doe
   Email: user@example.com
   Current Role: user

🔄 Updating role to admin...

✅ SUCCESS! John Doe is now an admin!

📝 Next steps:
   1. User should log out of the application
   2. User should log back in
   3. User can now access: http://localhost:3001/admin

🔌 Disconnected from MongoDB
```

---

### 2. List All Admins

**Command:**
```bash
node scripts/makeAdmin.js list
```

**Output:**
```
🔌 Connecting to MongoDB...
✅ Connected to MongoDB

🔍 Finding all admin users...

✅ Found 2 admin user(s):

1. John Doe
   Email: john@example.com
   Created: 1/15/2024
   Last Login: 1/20/2024

2. Jane Smith
   Email: jane@example.com
   Created: 1/16/2024
   Last Login: Never

🔌 Disconnected from MongoDB
```

---

### 3. Remove Admin Privileges

**Command:**
```bash
node scripts/makeAdmin.js remove user@example.com
```

**Output:**
```
🔌 Connecting to MongoDB...
✅ Connected to MongoDB

🔍 Looking for user: user@example.com

📋 User found:
   Name: John Doe
   Email: user@example.com
   Current Role: admin

🔄 Removing admin privileges...

✅ SUCCESS! John Doe is now a regular user!

🔌 Disconnected from MongoDB
```

---

## ⚠️ Common Issues

### Issue: "User not found"
**Solution:** Make sure the user has signed up through the application first.

```bash
# Check if user exists in MongoDB
mongosh
use nassu
db.users.findOne({ email: "user@example.com" })
```

### Issue: "Cannot connect to MongoDB"
**Solution:** Make sure MongoDB is running and the connection string in `.env` is correct.

```bash
# Check if MongoDB is running
mongosh

# Or start MongoDB
# Windows: Start MongoDB service
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Issue: "User is already an admin"
**Solution:** The user already has admin privileges. No action needed.

---

## 🔐 How It Works

### Authentication Flow:

1. **User signs up** → Creates account in Firebase + MongoDB
2. **User logs in** → Firebase authenticates
3. **Backend checks role** → Queries MongoDB for user's role
4. **Role determines access:**
   - `role: "admin"` → Can access `/admin` dashboard
   - `role: "user"` → Redirected to home page

### Important Notes:

- ✅ Firebase handles **authentication** (login/logout)
- ✅ MongoDB stores **user data and roles**
- ✅ Role changes require **logout and login** to take effect
- ✅ Only admins can access admin routes (protected by middleware)

---

## 🛠️ Alternative Methods

### Method 1: MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to your database → `users` collection
4. Find user by email
5. Edit document: change `"role": "user"` to `"role": "admin"`
6. Save

### Method 2: MongoDB Shell
```bash
mongosh
use nassu
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

### Method 3: API Endpoint (requires existing admin)
```bash
curl -X PATCH http://localhost:5000/api/users/USER_ID/role \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}'
```

---

## 📝 Examples

### Example 1: Create your first admin
```bash
# 1. Sign up through the app first
# Go to http://localhost:3001/signup
# Create account with email: admin@nassu.org

# 2. Make the user an admin
cd backend
node scripts/makeAdmin.js admin@nassu.org

# 3. Log out and log back in
# 4. Access admin dashboard at http://localhost:3001/admin
```

### Example 2: Manage multiple admins
```bash
# Make multiple users admins
node scripts/makeAdmin.js admin1@nassu.org
node scripts/makeAdmin.js admin2@nassu.org
node scripts/makeAdmin.js admin3@nassu.org

# List all admins
node scripts/makeAdmin.js list

# Remove one admin
node scripts/makeAdmin.js remove admin3@nassu.org
```

---

## 🔒 Security Best Practices

1. **Limit admin accounts** - Only give admin access to trusted users
2. **Regular audits** - Periodically run `node scripts/makeAdmin.js list` to review admins
3. **Remove unused admins** - Remove admin privileges when no longer needed
4. **Secure credentials** - Admins should use strong passwords
5. **Monitor activity** - Check admin activity logs regularly

---

## 📞 Support

If you encounter any issues:
1. Check MongoDB is running
2. Verify `.env` configuration
3. Ensure user has signed up first
4. Check the error message for details

For more help, contact the development team.

