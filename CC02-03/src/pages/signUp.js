import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/style.css';
import '../style/signup.css';
// Import your logo image
import crossLogo from '../assets/logo.png';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // TODO: Implement actual signup logic
    console.log('Signup data:', formData);
    
    // For now, show success and redirect to login
    setSuccess('Account created successfully! Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="desktop-signup-page">
      <div className="desktop-signup-container">
        <div className="desktop-signup-content">
          {/* Logo */}
          <div className="desktop-signup-logo-container">
            <img src={crossLogo} alt="Faith Community Logo" className="desktop-signup-logo" />
          </div>

          {/* Welcome Message */}
          <div className="desktop-signup-welcome-section">
            <h1 className="desktop-signup-welcome-title">Join Our Faith</h1>
            <h1 className="desktop-signup-welcome-title">Community</h1>
          </div>

          {/* Bible Quote */}
          <div className="desktop-signup-quote-section">
            <p className="desktop-signup-quote-text">
              So faith comes from hearing, and<br />
              hearing through the word of Christ.
            </p>
            <p className="desktop-signup-quote-reference">---Romans 10:17</p>
          </div>

          {/* Signup Form */}
          <form className="desktop-signup-form" onSubmit={handleSignup}>
            <div className="desktop-signup-form-group">
              <label htmlFor="username" className="desktop-signup-form-label">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                className="desktop-signup-form-input"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username here"
                required
              />
            </div>

            <div className="desktop-signup-form-group">
              <label htmlFor="email" className="desktop-signup-form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="desktop-signup-form-input active-field"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email here"
                required
              />
            </div>

            <div className="desktop-signup-form-group">
              <label htmlFor="password" className="desktop-signup-form-label">Password:</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="desktop-signup-form-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password here"
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

            <div className="desktop-signup-form-group">
              <label htmlFor="confirmPassword" className="desktop-signup-form-label">Confirm:</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="desktop-signup-form-input"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Enter password again to confirm"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showPassword ? '🔓' : '🔒'}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && <p className="desktop-signup-error-message">{error}</p>}
            
            {/* Success message */}
            {success && <p className="desktop-signup-success-message">{success}</p>}

            {/* Sign Up Button */}
            <button type="submit" className="desktop-signup-btn">
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="desktop-signup-login-section">
            <p className="desktop-signup-login-text">
              Already sign up? Please <button onClick={goToLogin} className="desktop-signup-login-link">log in here</button>
            </p>
          </div>

          {/* Apple Sign In */}
          <button className="desktop-signup-apple-signin-btn" disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Sign in with Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;