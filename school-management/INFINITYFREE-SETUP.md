# InfinityFree Database Setup for School Management System

## Your Database Credentials ✅
- **Username:** if0_39836260
- **Password:** XyK0mV9wLU  
- **Hostname:** sql213.infinityfree.com
- **Port:** 3306

## Step 1: Create Database

1. **Go to InfinityFree Control Panel**
   - Login to your InfinityFree account
   - Go to your hosting account control panel

2. **Create MySQL Database:**
   - Find "MySQL Databases" section
   - Click "Create Database"
   - Choose database name: `schools` (will become `if0_39836260_schools`)
   - Click "Create Database"

## Step 2: Set Up Database Schema

1. **Access phpMyAdmin:**
   - In control panel, click "phpMyAdmin"
   - Login with your MySQL credentials
   - Select your database `if0_39836260_schools`

2. **Create Schools Table:**
   - Click "SQL" tab
   - Copy and paste this SQL:

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

3. **Click "Go" to execute**

## Step 3: Test Connection

Your connection string for Vercel:
```
DATABASE_URL=mysql://if0_39836260:XyK0mV9wLU@sql213.infinityfree.com:3306/if0_39836260_schools
```

## Step 4: Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Configure InfinityFree MySQL"
   git push origin main
   ```

2. **Vercel Environment Variables:**
   - Go to Vercel dashboard
   - Add environment variable:
     - Name: `DATABASE_URL`
     - Value: `mysql://if0_39836260:XyK0mV9wLU@sql213.infinityfree.com:3306/if0_39836260_schools`

3. **Deploy and Test!**

## Troubleshooting

### If database name is different:
- Check available database names in InfinityFree control panel
- Update the database name in the connection string
- Common format: `if0_39836260_yourdbname`

### Connection Issues:
- Ensure database is created in InfinityFree
- Verify all credentials are correct
- Check if remote connections are enabled

Your database is now ready for production! 🎉
