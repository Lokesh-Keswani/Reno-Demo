import mysql from 'mysql2/promise';

// Create connection pool for better performance
const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Add SSL configuration for cloud databases
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Connection timeout settings
  acquireTimeout: 60000,
  timeout: 60000,
  // Reconnection settings
  reconnect: true,
});

// Test database connection
export const testConnection = async () => {
  try {
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

export default connection;
