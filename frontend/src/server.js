
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

// Set up the server

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Set up OpenAI endpoint

const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY
});

const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048,
  });
  res.send(completion.data.choices[0].text);
});

// Start the server

const port = 3030;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
