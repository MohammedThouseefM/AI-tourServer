const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function createNewUser() {
    console.log('👤 Creating new database user...');

    // Connect as root first
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    });

    try {
        // Create User
        await connection.execute(`CREATE USER IF NOT EXISTS 'ai_travels'@'localhost' IDENTIFIED BY 'ai_travels!234'`);
        console.log('✅ User ai_travels created.');

        // Grant Privileges
        await connection.execute(`GRANT ALL PRIVILEGES ON tourism_guide.* TO 'ai_travels'@'localhost'`);
        console.log('✅ Privileges granted on tourism_guide.*');

        await connection.execute('FLUSH PRIVILEGES');
        console.log('✅ Privileges flushed.');

        process.exit();
    } catch (err) {
        console.error('❌ Error creating user:', err);
        process.exit(1);
    }
}

createNewUser();
