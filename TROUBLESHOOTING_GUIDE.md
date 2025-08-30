# NASSU Troubleshooting Guide

This guide provides solutions to common issues you may encounter while developing, deploying, or maintaining the NASSU application.

## 🚨 Common Issues & Solutions

### Backend Issues

#### 1. Server Won't Start

**Problem**: Backend server fails to start with various error messages.

**Solutions**:

```bash
# Check if port is already in use
lsof -i :5000
# or on Windows
netstat -ano | findstr :5000

# Kill process using the port
kill -9 <PID>
# or on Windows
taskkill /PID <PID> /F

# Check if MongoDB is running
sudo systemctl status mongodb
# or
brew services list | grep mongodb

# Start MongoDB if not running
sudo systemctl start mongodb
# or
brew services start mongodb-community

# Check environment variables
echo $NODE_ENV
echo $MONGODB_URI
echo $JWT_SECRET

# Verify .env file exists and has correct values
cat .env
```

**Common Error Messages**:

```bash
# EADDRINUSE - Port already in use
Error: listen EADDRINUSE: address already in use :::5000

# ECONNREFUSED - MongoDB connection failed
MongoServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017

# ENOENT - Environment file missing
Error: ENOENT: no such file or directory, open '.env'
```

#### 2. TypeScript Compilation Errors

**Problem**: TypeScript fails to compile with type errors.

**Solutions**:

```bash
# Check TypeScript version
npx tsc --version

# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript configuration
cat tsconfig.json

# Run TypeScript compiler with verbose output
npx tsc --listFiles

# Fix specific type errors
# Add proper type definitions or use type assertions
```

**Common Type Errors**:

```typescript
// Property 'X' does not exist on type 'Y'
// Solution: Add proper interface or type definition
interface User {
  id: string;
  name: string;
  email: string;
}

// Type 'X' is not assignable to type 'Y'
// Solution: Use proper type casting or fix type mismatch
const user: User = response.data as User;

// Cannot find module 'X'
// Solution: Install missing package or check import path
npm install @types/express
```

#### 3. Database Connection Issues

**Problem**: Application cannot connect to MongoDB.

**Solutions**:

```bash
# Check MongoDB service status
sudo systemctl status mongodb

# Check MongoDB logs
sudo journalctl -u mongodb -f

# Test MongoDB connection manually
mongosh "mongodb://localhost:27017/nassu"

# Check connection string format
echo $MONGODB_URI
# Should be: mongodb://localhost:27017/nassu

# For MongoDB Atlas, check IP whitelist
# Add your current IP to MongoDB Atlas Network Access

# Test network connectivity
ping mongodb-atlas-cluster.mongodb.net
telnet mongodb-atlas-cluster.mongodb.net 27017
```

**Common MongoDB Errors**:

```bash
# Authentication failed
MongoServerError: Authentication failed

# Network timeout
MongoServerSelectionError: Server selection timed out

# Connection refused
MongoServerSelectionError: connect ECONNREFUSED
```

#### 4. JWT Authentication Issues

**Problem**: JWT tokens are invalid or expired.

**Solutions**:

```bash
# Check JWT secret in environment
echo $JWT_SECRET

# Verify JWT secret is not empty
if [ -z "$JWT_SECRET" ]; then
  echo "JWT_SECRET is not set"
fi

# Check JWT expiration time
echo $JWT_EXPIRES_IN

# Test JWT token generation
node -e "
const jwt = require('jsonwebtoken');
const token = jwt.sign({id: 'test'}, process.env.JWT_SECRET || 'fallback');
console.log('Token generated:', token);
"
```

**Common JWT Errors**:

```bash
# Invalid signature
JsonWebTokenError: invalid signature

# Token expired
TokenExpiredError: jwt expired

# Malformed token
JsonWebTokenError: jwt malformed
```

#### 5. PayPal Integration Issues

**Problem**: PayPal payments are not working.

**Solutions**:

```bash
# Check PayPal environment variables
echo $PAYPAL_CLIENT_ID
echo $PAYPAL_CLIENT_SECRET
echo $PAYPAL_MODE

# Verify PayPal mode (sandbox vs live)
# Development should use 'sandbox'
# Production should use 'live'

# Test PayPal credentials
curl -X POST https://api-m.sandbox.paypal.com/v1/oauth2/token \
  -H "Accept: application/json" \
  -H "Accept-Language: en_US" \
  -u "$PAYPAL_CLIENT_ID:$PAYPAL_CLIENT_SECRET" \
  -d "grant_type=client_credentials"
```

**Common PayPal Errors**:

```bash
# Invalid client credentials
{"error":"invalid_client","error_description":"Client Authentication failed"}

# Invalid payment method
{"error":"PAYMENT_METHOD_NOT_SUPPORTED"}

# Insufficient funds (sandbox)
{"error":"INSUFFICIENT_FUNDS"}
```

### Frontend Issues

#### 1. Build Failures

**Problem**: Frontend build process fails.

**Solutions**:

```bash
# Check Node.js version
node --version  # Should be >= 18.0.0

# Clear build cache
rm -rf dist/ node_modules/.vite

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Vite configuration
cat vite.config.ts

# Run build with verbose output
npm run build --verbose

# Check for TypeScript errors
npx tsc --noEmit
```

**Common Build Errors**:

```bash
# Module not found
Error: Cannot resolve module 'react'

# TypeScript compilation error
TS2307: Cannot find module './Component' or its corresponding type declarations

# Vite build error
Error: Build failed with 1 error
```

#### 2. Runtime Errors

**Problem**: Application crashes or shows errors in browser.

**Solutions**:

```bash
# Check browser console for errors
# Open Developer Tools (F12) and check Console tab

# Check network requests
# Check Network tab in Developer Tools

# Verify API endpoints are accessible
curl http://localhost:5000/api/health

# Check CORS configuration
# Ensure backend CORS_ORIGIN includes frontend URL
```

**Common Runtime Errors**:

```javascript
// Cannot read property 'X' of undefined
// Solution: Add null checks
const userName = user?.name || 'Unknown';

// Failed to fetch
// Solution: Check API endpoint and network connectivity
// Verify backend is running and accessible

// React Hook error
// Solution: Ensure hooks are called at top level of component
// Don't call hooks inside loops, conditions, or nested functions
```

#### 3. Styling Issues

**Problem**: CSS styles are not applied correctly.

**Solutions**:

```bash
# Check Tailwind CSS configuration
cat tailwind.config.ts

# Verify CSS imports in main files
cat src/index.css
cat src/App.css

# Check if Tailwind classes are being purged
# Ensure content paths are correct in tailwind.config.ts

# Rebuild CSS
npm run build
```

**Common Styling Issues**:

```css
/* Tailwind classes not working */
/* Solution: Check content paths in tailwind.config.ts */
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]

/* CSS not loading */
/* Solution: Check import statements and build process */

/* Responsive design not working */
/* Solution: Verify Tailwind responsive prefixes */
sm:text-lg md:text-xl lg:text-2xl
```

### Environment & Configuration Issues

#### 1. Environment Variables Not Loading

**Problem**: Environment variables are undefined or not accessible.

**Solutions**:

```bash
# Check if .env file exists
ls -la .env*

# Verify .env file content (don't commit sensitive data)
cat .env

# Check environment variable loading
node -e "console.log('NODE_ENV:', process.env.NODE_ENV)"

# Restart application after changing .env
# Environment variables are loaded at startup

# For production, check hosting platform environment settings
# Heroku: heroku config
# DigitalOcean: Check App Platform environment variables
# AWS: Check EC2 user data or environment configuration
```

**Common Environment Issues**:

```bash
# Variable not defined
undefined

# Variable is empty string
""

# Variable has wrong value
# Check for typos or incorrect values
```

#### 2. CORS Issues

**Problem**: Frontend cannot communicate with backend due to CORS.

**Solutions**:

```bash
# Check CORS configuration in backend
cat src/middleware/security.ts

# Verify CORS_ORIGIN environment variable
echo $CORS_ORIGIN

# Test CORS headers
curl -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS http://localhost:5000/api/auth/login
```

**Common CORS Errors**:

```bash
# Access to fetch at 'X' from origin 'Y' has been blocked by CORS policy
# Solution: Update CORS_ORIGIN to include frontend URL

# CORS preflight request failed
# Solution: Ensure OPTIONS method is handled correctly
```

### Performance Issues

#### 1. Slow API Responses

**Problem**: API endpoints are responding slowly.

**Solutions**:

```bash
# Check database query performance
# Use MongoDB explain() to analyze queries
db.users.find({email: "test@example.com"}).explain("executionStats")

# Check for missing database indexes
# Create indexes for frequently queried fields

# Monitor server resources
htop
# or
top

# Check for memory leaks
# Monitor memory usage over time

# Implement caching
# Use Redis for frequently accessed data
```

**Performance Optimization Tips**:

```typescript
// Add database indexes
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Implement pagination
const getUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return User.find().skip(skip).limit(limit);
};

// Use projection to select only needed fields
User.find().select('name email role');

// Implement caching
const cachedUser = await redis.get(`user:${userId}`);
if (!cachedUser) {
  const user = await User.findById(userId);
  await redis.setex(`user:${userId}`, 300, JSON.stringify(user));
}
```

#### 2. Frontend Performance Issues

**Problem**: Frontend is slow or unresponsive.

**Solutions**:

```bash
# Check bundle size
npm run build
# Look for bundle analysis in build output

# Use React DevTools Profiler
# Identify components that re-render unnecessarily

# Check for memory leaks
# Monitor memory usage in browser DevTools

# Implement code splitting
# Use React.lazy() for route-based code splitting
```

**Performance Optimization Tips**:

```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* render data */}</div>;
});

// Implement lazy loading
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Use useMemo for expensive calculations
const processedData = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Use useCallback for function props
const handleClick = useCallback(() => {
  // handle click
}, []);
```

### Security Issues

#### 1. Authentication Bypass

**Problem**: Users can access protected routes without authentication.

**Solutions**:

```bash
# Check authentication middleware
cat src/middleware/auth.ts

# Verify JWT token validation
# Check token expiration and signature

# Test protected endpoints
curl -H "Authorization: Bearer invalid-token" \
  http://localhost:5000/api/admin/users

# Check role-based access control
# Ensure admin routes require admin role
```

**Security Best Practices**:

```typescript
// Always validate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Implement role-based access control
const requireRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  next();
};
```

#### 2. Input Validation Issues

**Problem**: Malicious input can bypass validation.

**Solutions**:

```bash
# Check validation middleware
cat src/middleware/validation.ts

# Test input validation
# Try submitting malformed data to API endpoints

# Verify sanitization
# Check if user input is properly sanitized

# Test SQL injection attempts
# Ensure MongoDB queries are safe
```

**Input Validation Best Practices**:

```typescript
// Use validation libraries
import { body, validationResult } from 'express-validator';

const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Sanitize user input
const sanitizeInput = (input) => {
  return input.replace(/[<>]/g, '');
};
```

## 🔧 Debugging Tools

### Backend Debugging

```bash
# Enable debug logging
DEBUG=* npm run dev

# Use console.log strategically
console.log('User data:', user);
console.log('Request body:', req.body);

# Check application logs
tail -f logs/app.log
tail -f logs/error.log

# Use Node.js debugger
node --inspect server.js
# Then open Chrome DevTools and go to chrome://inspect
```

### Frontend Debugging

```javascript
// Use React DevTools
// Install React Developer Tools browser extension

// Use console.log for debugging
console.log('Component props:', props);
console.log('State:', state);

// Use React DevTools Profiler
// Profile component render performance

// Check network requests
// Use browser DevTools Network tab
```

### Database Debugging

```bash
# Enable MongoDB query logging
# Add to MongoDB configuration
setParameter: logLevel: 2

# Use MongoDB explain() for query analysis
db.users.find({email: "test@example.com"}).explain("executionStats")

# Check MongoDB logs
sudo journalctl -u mongodb -f

# Use MongoDB Compass for visual debugging
# Download from https://www.mongodb.com/products/compass
```

## 📋 Troubleshooting Checklist

### When Server Won't Start
- [ ] Check if port is already in use
- [ ] Verify MongoDB is running
- [ ] Check environment variables
- [ ] Verify .env file exists
- [ ] Check for TypeScript compilation errors

### When API Calls Fail
- [ ] Verify backend server is running
- [ ] Check API endpoint URLs
- [ ] Verify authentication tokens
- [ ] Check CORS configuration
- [ ] Review server logs for errors

### When Frontend Build Fails
- [ ] Check Node.js version
- [ ] Clear build cache
- [ ] Reinstall dependencies
- [ ] Check TypeScript errors
- [ ] Verify configuration files

### When Database Connection Fails
- [ ] Check MongoDB service status
- [ ] Verify connection string
- [ ] Check network connectivity
- [ ] Verify authentication credentials
- [ ] Check IP whitelist (for cloud databases)

### When Authentication Fails
- [ ] Verify JWT secret is set
- [ ] Check token expiration
- [ ] Verify user credentials
- [ ] Check database connection
- [ ] Review authentication middleware

## 🆘 Getting Help

### Before Asking for Help
1. Check this troubleshooting guide
2. Review application logs
3. Test with minimal reproduction case
4. Check if issue is environment-specific

### When Asking for Help
1. Describe the problem clearly
2. Include error messages and logs
3. Provide environment details
4. Share relevant code snippets
5. Explain what you've already tried

### Useful Resources
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Note**: This troubleshooting guide covers the most common issues. For specific problems, check the relevant documentation and consider reaching out to the development team.
