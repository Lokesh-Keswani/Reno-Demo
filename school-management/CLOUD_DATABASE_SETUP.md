# Cloud MySQL Database Setup Guide

## Current Issue
Your InfinityFree database connection is failing with `ENOTFOUND` error. This is common with free hosting services due to restrictions or server downtime.

## Recommended Cloud MySQL Providers

### 1. **PlanetScale** (Recommended - Free Tier Available)
- **Pros**: Excellent for Next.js, built-in branching, generous free tier
- **Free Tier**: 1 database, 1 billion reads/month, 10 million writes/month
- **Setup**:
  ```bash
  npm install @planetscale/database
  ```
- **Connection String Example**:
  ```
  DATABASE_URL="mysql://username:password@host.planetscale.app:3306/dbname?sslaccept=strict"
  ```

### 2. **Aiven MySQL** (Free Tier Available)
- **Pros**: Reliable, good performance, 1-month free trial
- **Free Tier**: 1 month trial, then paid plans start at $20/month
- **Connection String Example**:
  ```
  DATABASE_URL="mysql://username:password@mysql-service.aivencloud.com:port/dbname?ssl-mode=REQUIRED"
  ```

### 3. **Railway** (Good for Development)
- **Pros**: Easy setup, integrates well with Next.js
- **Free Tier**: $5 monthly credit (enough for small projects)
- **Connection String Example**:
  ```
  DATABASE_URL="mysql://root:password@containers-us-west-1.railway.app:port/railway"
  ```

### 4. **AWS RDS MySQL** (Production Ready)
- **Pros**: Highly reliable, scalable, enterprise-grade
- **Free Tier**: 12 months free (db.t3.micro instance)
- **Connection String Example**:
  ```
  DATABASE_URL="mysql://username:password@myinstance.region.rds.amazonaws.com:3306/dbname"
  ```

### 5. **Google Cloud SQL** (Enterprise Grade)
- **Pros**: Excellent performance, good integration with GCP
- **Free Tier**: $300 credit for new users
- **Connection String Example**:
  ```
  DATABASE_URL="mysql://username:password@public-ip:3306/dbname"
  ```

## Quick Setup Instructions

### For PlanetScale (Recommended):

1. **Sign up**: Go to [planetscale.com](https://planetscale.com)
2. **Create database**: Create a new database
3. **Get connection string**: Copy the connection string from dashboard
4. **Update your .env.local**:
   ```env
   DATABASE_URL="your_planetscale_connection_string"
   ```
5. **Install driver** (if using PlanetScale's serverless driver):
   ```bash
   npm install @planetscale/database
   ```

### For Railway:

1. **Sign up**: Go to [railway.app](https://railway.app)
2. **Create project**: Create new project and add MySQL service
3. **Get connection details**: Copy connection details from dashboard
4. **Update your .env.local**:
   ```env
   DB_HOST=containers-us-west-1.railway.app
   DB_PORT=6543
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=railway
   DATABASE_URL="mysql://root:password@containers-us-west-1.railway.app:6543/railway"
   ```

## Updated Configuration for Better Cloud Support

Your current `src/lib/db.ts` has been updated with:
- SSL support for cloud databases
- Better timeout configurations
- Connection retry logic
- Connection testing function

## Testing Your New Connection

Run the test script after updating your credentials:
```bash
node test-connection.js
```

## Production Recommendations

1. **For hobby projects**: PlanetScale or Railway
2. **For production apps**: AWS RDS or Google Cloud SQL
3. **For enterprise**: AWS RDS with Multi-AZ deployment

## Security Best Practices

1. Always use SSL connections in production
2. Store credentials in environment variables
3. Use connection pooling for better performance
4. Implement proper error handling
5. Consider using database connection middleware
