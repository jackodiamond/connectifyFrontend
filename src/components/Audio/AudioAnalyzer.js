import React, { useEffect, useRef, useState } from 'react';

const AudioAnalyzer = ({ audio }) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const dataArray = useRef(null);
  const source = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        analyser.current = audioContext.current.createAnalyser();
        analyser.current.fftSize = 256; // Adjust the size according to your needs
        const bufferLength = analyser.current.frequencyBinCount;
        dataArray.current = new Uint8Array(bufferLength);

        source.current = audioContext.current.createMediaStreamSource(audio);
        source.current.connect(analyser.current);

        // Start visualization loop
        visualize();
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initializeAudio();

    return () => {
      cancelAnimationFrame(rafId.current);
      if (analyser.current) {
        analyser.current.disconnect();
      }
      if (source.current) {
        source.current.disconnect();
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [audio]);

  const visualize = () => {
    analyser.current.getByteTimeDomainData(dataArray.current);
    setAudioData([...dataArray.current]);
    rafId.current = requestAnimationFrame(visualize);
  };

  return <AudioVisualizer audioData={audioData} />;
};

const AudioVisualizer = ({ audioData }) => {
  const canvas = useRef(null);

  const draw = () => {
    if (!canvas.current) return;
    const context = canvas.current.getContext('2d');
    const height = canvas.current.height;
    const width = canvas.current.width;
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;

    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineWidth = 2;
    context.strokeStyle = '#161743';

    for (const item of audioData) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }

    context.lineTo(x, height / 2);
    context.stroke();
  };

  useEffect(() => {
    draw();
  }, [audioData]);

  return <canvas width="500" height="500" ref={canvas} />;
};

export default AudioAnalyzer;
