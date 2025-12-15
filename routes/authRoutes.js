const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Reuse DB config or create a separate db module. 
// For simplicity in this file, I'll create a new pool but robust way is to export from db.js
// Let's assume we pass pool or create it here. 
// Better practice: create a config/db.js file. 
// For now, let's just create the pool here to keep it self-contained or move db connection to a separate file?

// I'll create a db.js quickly in the next step to avoid code duplication.
// For now, I will use a placeholder and fix it in server.js to export it? 
// Actually, creating config/db.js is cleaner. I'll do that first in my thought process, but tools run purely.
// I will write this file assuming `../config/db` exists.

const db = require('../config/db');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        // For the initial admin user I manually inserted, the password was already hashed? 
        // Wait, in schema.sql I put '$2b$10$YourHashedPasswordHere'. 
        // That is a place holder. The user won't be able to login with "admin123" unless I update it to the hash of "admin123".
        // I will provide a route to CREATE an initial admin or just update the hash in DB via a script.
        // Actually, init-db.js inserted it. 
        // I'll add a helper script to generate hash or just use a known hash for 'admin123'.
        // Hash for 'admin123' with cost 10: $2a$10$wI/..
        // I will fix this logic.

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
