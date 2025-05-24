import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/style.css';
import '../style/login.css';
// Import your logo image
import crossLogo from '../assets/logo.png';

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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
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

  // Navigate to signup page
  const goToSignup = () => {
    navigate('/signup');
  };

  // Used by test buttons to bypass login
  const goToHome = (role) => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate(`/home/${user.role}`);
    }
  };

  return (
    <div className="desktop-white-login-page">
      <div className="desktop-white-login-container">
        {/* Main Content */}
        <div className="desktop-white-content">
          {/* Logo */}
          <div className="desktop-white-logo-container">
            <img src={crossLogo} alt="Faith Community Logo" className="desktop-white-logo" />
          </div>

          {/* Welcome Message */}
          <div className="desktop-white-welcome-section">
            <h1 className="desktop-white-welcome-title">Welcome to Our</h1>
            <h1 className="desktop-white-welcome-title">Faith Community</h1>
          </div>

          {/* Login Form */}
          <form className="desktop-white-login-form" onSubmit={handleLogin}>
            <div className="desktop-white-form-group">
              <label htmlFor="username" className="desktop-white-form-label">Username:</label>
              <input
                type="text"
                id="username"
                className="desktop-white-form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="desktop-white-form-group">
              <label htmlFor="password" className="desktop-white-form-label">Password:</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="desktop-white-form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🔓' : '🔒'}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && <p className="desktop-white-error-message">{error}</p>}

            {/* Login Button */}
            <button type="submit" className="desktop-white-login-btn">
              Login
            </button>
          </form>

          {/* Signup Link */}
          <div className="desktop-white-signup-section">
            <p className="desktop-white-signup-text">
              New user? Please <button onClick={goToSignup} className="desktop-white-signup-link">sign up here</button>
            </p>
          </div>

          {/* Apple Sign In */}
          <button className="desktop-white-apple-signin-btn" disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Sign in with Apple
          </button>

          {/* Role buttons - horizontal layout */}
          <div className="desktop-white-role-buttons">
            <button type="button" onClick={() => goToHome('user')} className="desktop-white-role-btn user-red">
              User
            </button>
            <button type="button" onClick={() => goToHome('sermon-planner')} className="desktop-white-role-btn blue-btn">
              Sermon Planner
            </button>
            <button type="button" onClick={() => goToHome('prayer-coordinator')} className="desktop-white-role-btn blue-btn">
              Prayer Coordinator
            </button>
            <button type="button" onClick={() => goToHome('moderator')} className="desktop-white-role-btn blue-btn">
              Moderator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;