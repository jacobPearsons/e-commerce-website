import React, { useState, useEffect } from 'react';

const BotWebSocketController = () => {
  const [botStatus, setBotStatus] = useState(false);
  const [ws, setWs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new window.WebSocket('ws://localhost:8765');
    
    socket.onopen = () => {
      setError(null);
      socket.send('status');
    };
    
    socket.onmessage = (event) => {
      if (event.data === 'active') setBotStatus(true);
      else if (event.data === 'inactive') setBotStatus(false);
    };
    
    socket.onerror = (e) => {
      setError('WebSocket error. Please check the server.');
    };
    
    socket.onclose = () => {
      setError('WebSocket disconnected.');
    };
    
    setWs(socket);
    
    return () => socket.close();
  }, []);

  const startBot = () => {
    if (ws && ws.readyState === 1) ws.send('start_bot');
  };

  return (
    <div className="bot-controller" style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8, background: '#fafbfc' }}>
      <h2 style={{ marginBottom: 16 }}>Real-time Bot Control</h2>
      <p>Status: {botStatus ? <span style={{ color: 'green' }}>🟢 Active</span> : <span style={{ color: 'red' }}>🔴 Inactive</span>}</p>
      <button 
        onClick={startBot} 
        disabled={botStatus || !!error}
        className="start-button"
        style={{ padding: '8px 24px', fontSize: 16, borderRadius: 4, background: botStatus ? '#ccc' : '#4caf50', color: '#fff', border: 'none', cursor: botStatus ? 'not-allowed' : 'pointer', marginTop: 16 }}
      >
        Start Bot
      </button>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default BotWebSocketController; 