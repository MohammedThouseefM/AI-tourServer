const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Middleware to verify Admin (Copying from destinationRoutes, optimally should be in middleware file)
const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

router.get('/stats', verifyAdmin, async (req, res) => {
    try {
        const [destRows] = await db.execute('SELECT COUNT(*) as count FROM destinations');
        const [chatRows] = await db.execute('SELECT COUNT(*) as count FROM chat_logs');

        // Count distinct sessions maybe?
        const [sessionRows] = await db.execute('SELECT COUNT(DISTINCT user_session_id) as count FROM chat_logs');

        res.json({
            destinations: destRows[0].count,
            totalMessages: chatRows[0].count,
            totalSessions: sessionRows[0].count
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

module.exports = router;
