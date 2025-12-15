const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

async function initDB() {
    console.log('🔄 Initializing Database...');

    // Connect without database selected to create it
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'tourism_guide',
        port: process.env.DB_PORT || 3306,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined
    });

    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        // Split by semicolon, but handle cases where semicolon is part of data? 
        // For simple schema it's fine.
        // Actually schema.sql uses delimiter? No, standard SQL.
        // But mysql driver can query multiple statements if enabled.

        // Re-connect with multipleStatements: true
        await connection.end();
        const multiStmtConnection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'tourism_guide',
            port: process.env.DB_PORT || 3306,
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
            multipleStatements: true
        });

        await multiStmtConnection.query(schemaSql);
        console.log('✅ Database and tables created successfully.');
        await multiStmtConnection.end();

    } catch (error) {
        console.error('❌ Error initializing database:', error);
    }
}

initDB();
