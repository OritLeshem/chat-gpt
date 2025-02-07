const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY
});

const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!configuration.apiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",  // Updated to use current model
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

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));