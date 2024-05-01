import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import GoogleLoginComponent from './GoogleLoginComponent'; 
import config from '../../config';
import UserContext from '../../UserContext';

function Login() {
  const { setUsername,setProfilePic } = useContext(UserContext);
//  const {setOnlineUsers} = useContext(OnlineUsersContext);

  const navigate = useNavigate();
//  const dispatch = useDispatch(); // Initialize useDispatch hook

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(config.apiUrl+'auth/login', {
        email: formData.email,
        password: formData.password
      });
      //console.log("response ",response);

      setUsername(response.data.username);
      setProfilePic(response.data.profilePic);
  //    connectSocket('http://localhost:5000',setOnlineUsers)

     // setUser(response.data.username)
      
      // Dispatch the LOGIN action upon successful login
     // dispatch({ type: 'LOGIN' });
      // Redirect to feeds page upon successful login
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />
          <button type="submit">Login</button>
          <GoogleLoginComponent/>
        </form>
        <p className="signup-instead-text">Don't have an account? <Link to="/signup">Signup instead</Link></p>
      </div>
    </div>
  );
}

export default Login;
