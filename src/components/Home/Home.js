import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate('/video');
  };

  const handleAudioClick = () => {
    navigate('/audio');
  };

  const handleTextClick = () => { 
    navigate('/text');
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">
        {/* Optional Logo */}
        {/* <img src="logo.png" alt="App Logo" className="logo" /> */}
        {/* Optional Slogan */} 
        {/* <h2 className="slogan">Connect with new people instantly</h2> */}
        <div className="button-container">
          <button className="call-button" onClick={handleVideoClick}>Random Video Call</button>
          <button className="call-button" onClick={handleAudioClick}>Random Audio Call</button>
          <button className="call-button" onClick={handleTextClick}>Random Text Chat</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
