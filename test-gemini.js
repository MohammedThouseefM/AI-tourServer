const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

async function testModels() {
    const models = ["gemini-2.0-flash", "gemini-flash-latest"];
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    for (const m of models) {
        console.log(`Testing ${m}...`);
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Test");
            console.log(`✅ ${m} user works!`);
            return;
        } catch (e) {
            console.log(`❌ ${m} failed:`);
            console.error(e);
        }
    }
}

testModels();
