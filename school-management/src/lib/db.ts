import mysql from 'mysql2/promise';

// For production deployment, prefer DATABASE_URL if available
const connection = mysql.createPool(
  process.env.DATABASE_URL 
    ? process.env.DATABASE_URL
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'school_management',
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        acquireTimeout: 60000,
        timeout: 60000,
      }
);

export default connection;
