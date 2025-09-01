import mysql from 'mysql2/promise';

// Database configuration
const dbConfig: any = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Add SSL only for production
if (process.env.NODE_ENV === 'production') {
  dbConfig.ssl = { rejectUnauthorized: true };
}

// Create connection using DATABASE_URL if available, otherwise use individual config
const connection = process.env.DATABASE_URL 
  ? mysql.createPool(process.env.DATABASE_URL)
  : mysql.createPool(dbConfig);

export default connection;
