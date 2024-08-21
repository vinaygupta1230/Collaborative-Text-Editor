// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import './loginSignup.css';
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async () => {
    console.log(username);
    console.log(password);
    try {
      console.log("HII");
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      const response111 = await axios.post('http://localhost:3000/loginnnn', { username });
      console.log(response.data);
      // Handle success scenario
      localStorage.setItem("token",response.data.token);
      navigate(`/${username}/dashboard`, { state: response.data});
    } catch (error) {
      setError('An error occurred while logging in');
      console.log(error);
      console.log("Error!!!");
    }
    
    };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
