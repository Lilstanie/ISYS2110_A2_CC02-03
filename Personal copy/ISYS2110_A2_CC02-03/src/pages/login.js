import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/style.css';
import '../style/login.css';

// Mock user data
const mockUsers = [
  { username: 'User', password: 'pass', role: 'user', email: 'user@example.com', phone: '123-456-7890' },
  { username: 'SermonPlanner', password: 'pass', role: 'sermon-planner', email: 'sermon@example.com', phone: '111-222-3333' },
  { username: 'PrayerCoordinator', password: 'pass', role: 'prayer-coordinator', email: 'prayer@example.com', phone: '444-555-6666' },
  { username: 'Moderator', password: 'pass', role: 'moderator', email: 'moderator@example.com', phone: '999-888-7777' },
];

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle login
  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate(`/home/${user.role}`);
    } else {
      setError('Invalid username or password');
    }
  };

  // Used by test buttons to bypass login
  const goToHome = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    navigate(`/home/${user.role}`);
  };

  return (
    <div className="App login-container">
      <div className="login-box">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>LOGIN PAGE</h1>

        {/* Login */}
        <div>
          <label htmlFor="username" style={{ fontSize: '1.2rem', color: 'black' }}>Username:</label><br />
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div>
          <label htmlFor="password" style={{ fontSize: '1.2rem', color: 'black' }}>Password:</label><br />
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {/* Login Button */}
        <button className="button_blue" onClick={handleLogin}>
          Login
        </button>

        {/* Display login error */}
        {error && <p className="login-error">{error}</p>}

        {/* Test buttons */}
        <p style={{ color: 'black', marginBottom: '1rem', fontSize: '1.2rem' }}>Test buttons (bypass login):</p>
        <div>
          <button className="button_red" onClick={() => goToHome('user')}>User</button>
          <button className="button_blue" onClick={() => goToHome('sermon-planner')}>Sermon Planner</button>
          <button className="button_blue" onClick={() => goToHome('prayer-coordinator')}>Prayer Coordinator</button>
          <button className="button_blue" onClick={() => goToHome('moderator')}>Moderator</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
