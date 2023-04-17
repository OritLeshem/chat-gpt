import React, { useState } from 'react';

const ChatGPT = () => {
  const [conversation, setConversation] = useState([]);
  const [inputText, setInputText] = useState('');

  const API_KEY = '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';

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `User: ${inputText}\nAI: `;
    const response = await sendPromptToAPI(prompt);
    const updatedConversation = [...conversation, { text: inputText, isUser: true }, { text: response, isUser: false }];

    setInputText('');
    setConversation(updatedConversation);
  }

  const sendPromptToAPI = async (prompt) => {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 60,
        n: 1,
        stop: '\n'
      })
    });

    const data = await response.json();
    console.log(data)
    return data.choices[0].text.trim();
  }

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <p key={index} className={message.isUser ? 'user-message' : 'bot-message'}>{message.text}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatGPT;
