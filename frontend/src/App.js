import { useState } from 'react';
import axios from 'axios';
import AppLogo from './app-logo.png';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Use the full URL in development, relative path in production
  const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3030/chat'
    : '/chat';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    axios
      .post(API_URL, { prompt })
      .then((res) => {
        setResponse(res.data.response || 'No response received');
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setResponse(err.response?.data?.error || 'Failed to connect to server');
        setLoading(false);
      });
  };

  return (
    <div className="wrapper">
      <img src={AppLogo} alt="" className="app-logo" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything... :)"
        />
        <button type="submit">Ask</button>
      </form>
      <p className="response-area">
        {loading ? 'loading...' : response}
      </p>
    </div>
  );
}

export default App;