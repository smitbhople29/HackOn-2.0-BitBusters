require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/chatbot.html");
});

app.post("/api/chat", async (req, res) => {

  try {

    const { system, messages } = req.body;

    const lastMessage = messages[messages.length - 1].content;

    const prompt = system + "\n\nStudent question: " + lastMessage;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    res.json({
      content: [{ text }]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server error"
    });

  }

});

app.listen(3000, () => {
  console.log("Server running:");
  console.log("http://localhost:3000/chatbot.html");
});