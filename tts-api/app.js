const express = require("express");
const { synthesizeSpeechWithSSML } = require("./polly-service");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow requests from any origin
app.use(bodyParser.json());

// Configure AWS SDK
AWS.config.update({
  region: "us-east-2", // Change to your desired AWS region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set via environment variable
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set via environment variable
});

// Initialize Polly client
const polly = new AWS.Polly();
app.post("/text-to-speech", async (req, res) => {
    const { text, voiceId = "Joanna", outputFormat = "mp3", useSSML = false } = req.body;
    if (!text) {
        console.error("Error: Text is missing");
      return res.status(400).send({ error: "Text is required" });      
    }
  
    try {
      const textType = useSSML? "ssml" : "text";
      const audioStream = await synthesizeSpeechWithSSML(
        text,
        voiceId,
        outputFormat,
        textType
      );
      console.log("AudioStream generated successfully");
      res.set({
        "Content-Type": `audio/${outputFormat}`,
        "Content-Disposition": `attachment; filename="speech.${outputFormat}"`,
      });
  
      audioStream.pipe(res); // Stream audio response
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ error: "Error processing text-to-speech" });
    }
  });

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});