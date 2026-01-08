const bcrypt = require('bcryptjs');
const db = require('./config/db');

async function createTestUser() {
  try {
    const email = 'test@example.com';
    const password = 'test123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existing.length > 0) {
      console.log('Test user already exists!');
      console.log('Email: test@example.com');
      console.log('Password: test123');
      process.exit(0);
    }

    // Create test user
    await db.query(
      'INSERT INTO users (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)',
      ['Test User', email, '9999999999', '123 Test Street, Test City', hashedPassword]
    );

    console.log('✅ Test user created successfully!');
    console.log('-----------------------------------');
    console.log('Email: test@example.com');
    console.log('Password: test123');
    console.log('-----------------------------------');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
}

createTestUser();
