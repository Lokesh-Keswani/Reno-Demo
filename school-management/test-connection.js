// Test database connection
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Port:', process.env.DB_PORT);
    console.log('User:', process.env.DB_USER);
    console.log('Database:', process.env.DB_NAME);
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false }, // For cloud databases
      connectTimeout: 60000,
      acquireTimeout: 60000,
      timeout: 60000
    });

    console.log('✅ Database connected successfully!');
    
    // Test if schools table exists
    const [tables] = await connection.execute("SHOW TABLES LIKE 'schools'");
    if (tables.length > 0) {
      console.log('✅ Schools table found!');
      
      // Test table structure
      const [columns] = await connection.execute("DESCRIBE schools");
      console.log('✅ Table structure:', columns.map(col => col.Field));
    } else {
      console.log('❌ Schools table not found. Creating it...');
      
      // Create table
      await connection.execute(`
        CREATE TABLE schools (
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
        )
      `);
      console.log('✅ Schools table created successfully!');
    }
    
    await connection.end();
    console.log('✅ Connection test complete!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Error code:', error.code);
    console.log('\n🔧 Troubleshooting tips for cloud database:');
    console.log('1. Check your internet connection');
    console.log('2. Verify your cloud database credentials are correct');
    console.log('3. Make sure your database server allows remote connections');
    console.log('4. Check if your IP is whitelisted (if required)');
    console.log('5. Verify the database name exists on the server');
  }
}

testConnection();
