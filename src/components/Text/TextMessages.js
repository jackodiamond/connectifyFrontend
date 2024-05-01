import React, { useState, useEffect,useRef } from 'react';
import './TextMessages.css';
import HomeScreen from '../Home/HomeScreen';
import Button from "@material-ui/core/Button";
import io from 'socket.io-client';

// Replace 'http://localhost:5000' with your server URL

function TextMessages() {
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId,setRoomId] = useState('');
  const socket = useRef(null)

  useEffect(() => {
    if(socket.current===null)
    {
      socket.current = io('http://65.2.180.137:5000/'); 
    }
    // Listen for messages from the server
    socket.current.on('message', (message) => {
      console.log("message recieved ",message)
      setChatHistory(prevChatHistory => [...prevChatHistory, { sender: 'Friend', content: message.text }]);
    });

    // Join a random room
    const username = 'You' + Math.random(); // Replace 'You' with the actual username
    

    socket.current.on('roomId', (roomId) => {
      setRoomId(roomId)
      socket.current.emit('join', roomId, username);
    });

    // Clean up on unmount
    return () => {
      socket.current.disconnect();
    };
  }, []); // Only run once on component mount

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.current.emit('sendMessage', roomId, newMessage); // Send message to the server
      setChatHistory(prevChatHistory => [...prevChatHistory, { sender: 'You', content: newMessage }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleNext = (event) => {
    setChatHistory([])
    socket.current.emit('next',roomId);
    setRoomId('') 
  };

  return (
    <div className="chat-container">
      <HomeScreen />
      <header className="chat-header">
        <img src="https://via.placeholder.com/150" alt="User Avatar" />
        <h2>Friend Name</h2>
        <div className="next-btn">
          <Button variant="outlined" onClick={handleNext}>
            Next
          </Button>
        </div>
      </header>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender === 'You' ? 'sent' : 'received'}`}>
            {message.content}
          </div>
        ))}
      </div>
      <footer className="chat-footer">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
}

export default TextMessages;
