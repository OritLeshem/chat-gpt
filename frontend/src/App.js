import { useState } from 'react';
import axios from 'axios';
// import CGLogo from './chatGPT.png';
import AppLogo from './app-logo.png';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // communicate with API
    // post input value 'prompt' to API end point 
    // .post("http://localhost:3030/chat", { prompt })
    // .post("https://chat-gpt-az9j.onrender.com", { prompt })

    axios
      // .post("http://localhost:3030/chat", { prompt })
      // .post("https://chat-gpt-az9j.onrender.com/chat", { prompt })
      .post("https://https://chat-gpt-backend-4v5b.onrender.com//chat", { prompt })


      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  return (
    <div className="wrapper">
      <img src={AppLogo} alt="" className="app-logo" />
      <form onSubmit={handleSubmit}>
        {/* <img src={CGLogo} alt="" className={loading ? 'cg-logo loading' : 'cg-logo'} /> */}
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
      {/* <div className="footer">~ Orit Leshem ~</div> */}
    </div>
  );
}

export default App;