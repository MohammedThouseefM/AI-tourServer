const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Middleware to verify Admin
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

// GET all destinations (Public)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM destinations ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching destinations:', err);
        res.status(500).json({ message: 'Error fetching destinations', error: err.message });
    }
});

// GET single destination (Public)
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM destinations WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Destination not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching destination' });
    }
});

// POST create destination (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
    const { name, description, location, image_url } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO destinations (name, description, location, image_url) VALUES (?, ?, ?, ?)',
            [name, description, location, image_url]
        );
        res.status(201).json({ id: result.insertId, name, description, location, image_url });
    } catch (err) {
        res.status(500).json({ message: 'Error creating destination' });
    }
});

// PUT update destination (Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
    const { name, description, location, image_url } = req.body;
    try {
        await db.execute(
            'UPDATE destinations SET name = ?, description = ?, location = ?, image_url = ? WHERE id = ?',
            [name, description, location, image_url, req.params.id]
        );
        res.json({ message: 'Destination updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating destination' });
    }
});

// DELETE destination (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        await db.execute('DELETE FROM destinations WHERE id = ?', [req.params.id]);
        res.json({ message: 'Destination deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting destination' });
    }
});

module.exports = router;
