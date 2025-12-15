const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Mock Function
const generateMockResponse = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) return "Hello! I'm your AI travel assistant. How can I help you plan your trip today?";
    if (lower.includes('paris')) return "Paris is a beautiful city known as the City of Light. Don't miss the Eiffel Tower and the Louvre!";
    if (lower.includes('price') || lower.includes('cost')) return "Travel costs vary by season. I recommend booking at least 3 months in advance for best rates.";
    return "That sounds interesting! Tell me more about what you're looking for in your vacation.";
};

router.post('/message', async (req, res) => {
    const { message, sessionId } = req.body;

    if (!message) return res.status(400).json({ message: 'Message required' });

    let aiResponse = null;

    // 1. Try Google Gemini (Free Tier Available)
    if (process.env.GEMINI_API_KEY) {
        try {
            const { GoogleGenerativeAI } = require("@google/generative-ai");
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

            const prompt = `You are a helpful travel assistant. You give travel recommendations and tips. User message: ${message}`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            aiResponse = response.text();
        } catch (e) {
            console.error("Gemini Error:", e.message);
        }
    }

    // 2. Try OpenAI (If Gemini failed or not configured)
    if (!aiResponse && process.env.OPENAI_API_KEY) {
        try {
            const OpenAI = require('openai');
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "You are a helpful travel assistant. You give travel recommendations and tips." }, { role: "user", content: message }],
                model: "gpt-3.5-turbo",
            });
            aiResponse = completion.choices[0].message.content;
        } catch (e) {
            console.error("OpenAI Error:", e.message);
        }
    }

    // 3. Fallback to Mock
    if (!aiResponse) {
        aiResponse = generateMockResponse(message);
    }

    try {
        await db.execute(
            'INSERT INTO chat_logs (user_session_id, user_message, ai_response) VALUES (?, ?, ?)',
            [sessionId || 'guest', message, aiResponse]
        );
        res.json({ response: aiResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error processing chat' });
    }
});

router.get('/history', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM chat_logs ORDER BY timestamp DESC LIMIT 50');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching history' });
    }
});

module.exports = router;
