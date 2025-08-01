const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test the connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`✅ Database is working! User count: ${userCount}`);
    
    await prisma.$disconnect();
    console.log('✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\nTo fix this:');
    console.log('1. Make sure PostgreSQL is running');
    console.log('2. Create a database named "wagr"');
    console.log('3. Update the DATABASE_URL in .env file');
    console.log('4. Run: npx prisma migrate dev');
  }
}

testConnection();