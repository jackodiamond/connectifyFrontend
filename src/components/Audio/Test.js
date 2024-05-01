import React, { useState } from 'react';
import AudioAnalyze from './AudioAnalyzer';

const Test = () => {
  const [audio, setAudio] = useState(null);

  const getMicrophone = async () => {
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setAudio(audioStream);
  };

  const stopMicrophone = () => {
    audio.getTracks().forEach(track => track.stop());
    setAudio(null);
  };

  const toggleMicrophone = () => {
    audio ? stopMicrophone() : getMicrophone();
  };

  return (
    <div className="App">
      <div className="controls">
        <button onClick={toggleMicrophone}>
          {audio ? 'Stop Microphone' : 'Get microphone input'}
        </button>
      </div>
      {audio ? <AudioAnalyze audio={audio} /> : ''}
    </div>
  );
};

export default Test;
