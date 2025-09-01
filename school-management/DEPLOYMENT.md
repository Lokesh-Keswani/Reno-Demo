# Deployment Guide for School Management System

## Prerequisites
- GitHub account
- Vercel account
- Free MySQL database account (Railway/Aiven/FreeSQLDatabase)

## Step 1: Set up Free MySQL Database

### Option A: Railway (Recommended)
1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub (gets $5 free credits)

2. **Create Database**
   - Click "New Project" → "Provision MySQL"
   - Database will be created automatically

3. **Get Connection Details**
   - Click on MySQL service
   - Go to "Connect" tab
   - Copy the `DATABASE_URL`

### Option B: Aiven (30-day free)
1. **Create Aiven Account**
   - Go to [aiven.io](https://aiven.io)
   - Sign up for free trial

2. **Create MySQL Service**
   - Choose "MySQL"
   - Select free trial plan
   - Choose region

3. **Get Connection String**
   - Go to service dashboard
   - Copy connection details

### Import Schema
4. **Import Schema**
   - Use the database console (Railway Query tab / Aiven Console)
   - Run the following SQL:
   ```sql
   CREATE TABLE IF NOT EXISTS schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name TEXT NOT NULL,
       address TEXT NOT NULL,
       city TEXT NOT NULL,
       state TEXT NOT NULL,
       contact VARCHAR(15) NOT NULL,
       image TEXT,
       email_id TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

## Step 2: Prepare Code for Deployment

1. **Update Environment Variables**
   - Update `.env.local` with PlanetScale connection details
   
2. **Push to GitHub**
   - Create a GitHub repository
   - Push your code to GitHub

## Step 3: Deploy to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Import Project"
   - Select your school-management repository

2. **Configure Environment Variables**
   - In Vercel dashboard, go to your project settings
   - Add the following environment variables:
     - `DATABASE_URL`: Your MySQL connection string from Railway/Aiven
     - `NODE_ENV`: production

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

## Step 4: Verify Deployment

1. **Test Functionality**
   - Visit your deployed URL
   - Test adding a school
   - Test viewing schools
   - Verify image uploads work

## Environment Variables Template

Create these in Vercel dashboard:

```
DATABASE_URL=mysql://username:password@host:port/database
NODE_ENV=production
```

## Troubleshooting

### Common Issues:
1. **Database Connection**: Ensure environment variables are correctly set
2. **Image Uploads**: Vercel's serverless functions have limitations - consider using cloud storage
3. **Build Errors**: Check the build logs in Vercel dashboard

### Image Storage Recommendations:
For production, consider using:
- Cloudinary
- AWS S3
- Vercel Blob Storage
- Uploadcare

## Performance Optimization

1. **Image Optimization**: Use Next.js Image component
2. **Database**: Use connection pooling (already implemented)
3. **Caching**: Add appropriate cache headers

## Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **Database**: Use SSL connections (PlanetScale provides this)
3. **File Uploads**: Validate file types and sizes
