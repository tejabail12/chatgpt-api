// Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

// Load environment variables from .env file
dotenv.config();

// Log the API key to verify it's loaded correctly (remove this in production)
console.log("Loaded API key:", process.env.OPENAI_API_KEY);

// Initialize Express app and middleware
const app = express();
app.use(cors());
app.use(express.json());

// Create OpenAI client using API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API route to handle chatbot interaction
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = chatResponse.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Something went wrong with OpenAI API" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("✅ Server is running at http://localhost:3000");
});
