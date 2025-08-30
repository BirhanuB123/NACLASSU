# NASSU Deployment Guide

This guide covers deploying the NASSU application to various hosting platforms, including both development and production environments.

## 🚀 Prerequisites

Before deployment, ensure you have:

- [Node.js 18+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) for version control
- [MongoDB](https://www.mongodb.com/) database (local or cloud)
- [PayPal Developer Account](https://developer.paypal.com/) for payment processing
- [Firebase Project](https://firebase.google.com/) for file storage (optional)

## 🔧 Environment Configuration

### 1. Environment Variables

Create environment files for different environments:

#### Development (.env.development)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nassu_dev
JWT_SECRET=your_development_jwt_secret_here
JWT_EXPIRES_IN=7d
PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_paypal_sandbox_client_secret
PAYPAL_MODE=sandbox
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=http://localhost:3000
```

#### Production (.env.production)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nassu_prod
JWT_SECRET=your_production_jwt_secret_here
JWT_EXPIRES_IN=1d
PAYPAL_CLIENT_ID=your_paypal_live_client_id
PAYPAL_CLIENT_SECRET=your_paypal_live_client_secret
PAYPAL_MODE=live
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
REDIS_URL=redis://your-redis-url:6379
CORS_ORIGIN=https://yourdomain.com
```

### 2. Database Setup

#### MongoDB Atlas (Recommended for Production)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create database user with read/write permissions
4. Get connection string
5. Add IP whitelist for your deployment server

#### Local MongoDB
```bash
# Install MongoDB
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Start MongoDB service
sudo systemctl start mongodb
# or
brew services start mongodb-community
```

## 🏗️ Build Process

### 1. Backend Build
```bash
cd backend

# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# The build output will be in the `dist/` folder
```

### 2. Frontend Build
```bash
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# The build output will be in the `dist/` folder
```

## 📦 Deployment Options

### Option 1: Heroku

#### Backend Deployment
1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create nassu-backend
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set PAYPAL_CLIENT_ID=your_paypal_client_id
   heroku config:set PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   heroku config:set CORS_ORIGIN=https://yourdomain.com
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

6. **Start the App**
   ```bash
   heroku ps:scale web=1
   ```

#### Frontend Deployment
1. **Create Frontend App**
   ```bash
   cd frontend
   heroku create nassu-frontend
   ```

2. **Set Buildpack**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy frontend to Heroku"
   git push heroku main
   ```

### Option 2: DigitalOcean App Platform

#### Backend Deployment
1. **Create App in DigitalOcean Console**
2. **Connect GitHub Repository**
3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Source Directory: `backend`

4. **Set Environment Variables**
   - Add all required environment variables in the console

5. **Deploy**
   - Click "Deploy" button

#### Frontend Deployment
1. **Create Another App**
2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Source Directory: `frontend`
   - Output Directory: `dist`

### Option 3: AWS

#### Backend Deployment (EC2)
1. **Launch EC2 Instance**
   ```bash
   # Connect to instance
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

2. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   
   # Install MongoDB
   sudo apt install -y mongodb
   ```

3. **Clone and Deploy**
   ```bash
   git clone https://github.com/yourusername/nassu.git
   cd nassu/backend
   npm install
   npm run build
   
   # Start with PM2
   pm2 start dist/server.js --name "nassu-backend"
   pm2 startup
   pm2 save
   ```

#### Frontend Deployment (S3 + CloudFront)
1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://nassu-frontend
   ```

2. **Upload Build Files**
   ```bash
   cd frontend
   npm run build
   aws s3 sync dist/ s3://nassu-frontend --delete
   ```

3. **Configure CloudFront Distribution**
   - Origin: S3 bucket
   - Default root object: `index.html`
   - Error pages: Redirect 404 to `/index.html`

### Option 4: Vercel (Frontend Only)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment Variables**
   - Add in Vercel dashboard

### Option 5: Netlify (Frontend Only)

1. **Connect GitHub Repository**
2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Set Environment Variables**
4. **Deploy**

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env` files to version control
- Use strong, unique secrets for production
- Rotate secrets regularly

### 2. Database Security
- Use strong passwords
- Enable network access restrictions
- Use SSL connections
- Regular backups

### 3. API Security
- Enable rate limiting
- Use HTTPS in production
- Implement proper CORS policies
- Validate all inputs

### 4. SSL/TLS
```bash
# Let's Encrypt (Ubuntu)
sudo apt install certbot
sudo certbot --nginx -d yourdomain.com

# Heroku (automatic)
# DigitalOcean (automatic)
# AWS (use ACM)
```

## 📊 Monitoring and Logging

### 1. Application Monitoring
```bash
# PM2 monitoring
pm2 monit
pm2 logs

# Heroku logs
heroku logs --tail

# AWS CloudWatch
# DigitalOcean monitoring
```

### 2. Error Tracking
- [Sentry](https://sentry.io/) for error monitoring
- [LogRocket](https://logrocket.com/) for session replay
- [New Relic](https://newrelic.com/) for performance monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: |
          cd backend
          npm install
          npm run build
      - uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /var/www/nassu/backend
            git pull origin main
            npm install
            npm run build
            pm2 restart nassu-backend

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: |
          cd frontend
          npm install
          npm run build
      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: |
          aws s3 sync frontend/dist/ s3://nassu-frontend --delete
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

## 🧪 Testing Deployment

### 1. Health Check Endpoint
Add to your backend:

```typescript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});
```

### 2. Test Commands
```bash
# Test backend
curl https://your-backend-domain.com/health

# Test frontend
curl -I https://your-frontend-domain.com

# Test API endpoints
curl https://your-backend-domain.com/api/lessons
```

## 📈 Performance Optimization

### 1. Backend
- Enable compression
- Implement caching (Redis)
- Use connection pooling
- Optimize database queries

### 2. Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize bundle size

### 3. Database
- Create proper indexes
- Use read replicas
- Implement connection pooling
- Regular maintenance

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port
   lsof -i :5000
   
   # Kill process
   kill -9 <PID>
   ```

2. **MongoDB Connection Issues**
   ```bash
   # Check MongoDB status
   sudo systemctl status mongodb
   
   # Restart MongoDB
   sudo systemctl restart mongodb
   ```

3. **Build Failures**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Environment Variable Issues**
   ```bash
   # Check environment variables
   printenv | grep NASSU
   
   # Test in Node.js
   node -e "console.log(process.env.NODE_ENV)"
   ```

## 📚 Additional Resources

- [Node.js Production Best Practices](https://expressjs.com/en/advanced/best-practices-production.html)
- [MongoDB Production Checklist](https://docs.mongodb.com/manual/administration/production-checklist/)
- [Heroku Deployment Guide](https://devcenter.heroku.com/categories/nodejs-support)
- [AWS Deployment Guide](https://aws.amazon.com/getting-started/)
- [DigitalOcean App Platform](https://docs.digitalocean.com/products/app-platform/)

---

**Note**: This deployment guide covers the most common scenarios. Adjust the steps based on your specific hosting provider and requirements.
