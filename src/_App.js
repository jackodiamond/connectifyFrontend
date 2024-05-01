import logo from './logo.svg';
import './App.css';
import GoogleLoginComponent from './components/Login/GoogleLoginComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import VideoCall from './components/Video/VideoCall';
//import AudioCall from './components/Audio/AudioCall';
import TextMessages from './components/Text/TextMessages';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import VideoTest from './components/Video/VideoTest';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<VideoTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          {/*
          <Route path="/video" element={<VideoCall />} />
          <Route path="/audio" element={<AudioCall />} />
           */}
          <Route path="/text" element={<TextMessages />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
