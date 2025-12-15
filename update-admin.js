const db = require('./config/db');

async function updateAdmin() {
    try {
        const hash = '$2b$10$ySagOKSlzPcCcOALMD5o.OowVloKdxMjust0cYz8iUbTieSKuyhmC'; // Hash for 'admin123'
        await db.execute('UPDATE users SET password_hash = ? WHERE username = ?', [hash, 'admin']);
        console.log('✅ Admin password updated');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

updateAdmin();
