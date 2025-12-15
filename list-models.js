const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

// Since we don't have direct listModels in common usages without GoogleAIFileManager or similar sometimes, 
// let's try to use the raw fetch if sdk doesn't exposing it easily in one line.
// But actually, for Generative Language API, we can use a REST call to check.

async function listModelsRaw() {
    const key = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Models Response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

listModelsRaw();
