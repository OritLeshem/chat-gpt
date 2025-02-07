const express = require('express');
const cors = require('cors');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();

// Express middleware
app.use(express.json());
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY
});

const openai = new OpenAIApi(configuration);

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!configuration.apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2048
    });

    res.json({
      response: completion.data.choices[0].message.content
    });

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data?.error?.message || 'An error occurred'
    });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Make sure you have set the CHATBOT_KEY environment variable`);
});