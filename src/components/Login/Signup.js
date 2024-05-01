import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import config from '../../config';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      /*
      // Check if the username already exists
      const existingUsernames = await axios.get('config.apiUrl'+'auth/usernames');
      if (existingUsernames.data.includes(formData.username)) {
        alert('Username already exists. Please choose a different username.');
        return; // Exit function if username already exists
      }
*/
console.log("singupaa!")
      // If the username is unique, proceed with signup
      const response = await axios.post(config.apiUrl+'auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <button type="submit">Signup</button>
        </form>
        <p className="login-instead-text">Already have an account? <Link to="/login">Login instead</Link></p>
      </div>
    </div>
  );
}

export default Signup;
