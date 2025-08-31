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
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure MySQL server is running on port 3000');
    console.log('2. Check your password is correct: 270778');
    console.log('3. Try connecting manually with full path:');
    console.log('   "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe" -u root -p -P 3000');
  }
}

testConnection();
