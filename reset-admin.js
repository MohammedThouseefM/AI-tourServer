const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function resetAdmin() {
    console.log('🔄 Resetting admin credentials...');

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'tourism_guide',
        port: process.env.DB_PORT || 3306,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined
    });

    try {
        const username = 'admin';
        const password = 'admin123';
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Check if user exists
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length > 0) {
            // Update existing
            await connection.execute('UPDATE users SET password_hash = ?, role = ? WHERE username = ?', [hash, 'admin', username]);
            console.log('✅ Admin user updated.');
        } else {
            // Create new
            await connection.execute('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', [username, hash, 'admin']);
            console.log('✅ Admin user created.');
        }

        console.log(`\n🔑 Credentials Set:\nUsername: ${username}\nPassword: ${password}\n`);
        process.exit();

    } catch (error) {
        console.error('❌ Error resetting admin:', error);
        process.exit(1);
    }
}

resetAdmin();
