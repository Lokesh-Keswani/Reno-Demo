const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

const setupDatabase = async () => {
  let connection = null;
  
  try {
    console.log('🔄 Connecting to Railway database...');
    
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false }
    });

    console.log('✅ Connected to database successfully!');

    // Create schools table
    const createTableQuery = `
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
      )
    `;

    await connection.execute(createTableQuery);
    console.log('✅ Schools table created/verified successfully!');

    // Test query to check if table exists and is accessible
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM schools');
    console.log(`✅ Table is accessible. Current school count: ${rows[0].count}`);

    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    console.error('Error details:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      // Don't log password for security
    });
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
};

setupDatabase();
