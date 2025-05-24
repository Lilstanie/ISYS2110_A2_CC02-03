import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/style.css';
import '../style/home.css';
import crossLogo from '../assets/logo.png';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'sermon-planner': return 'Sermon Planner';
      case 'prayer-coordinator': return 'Coordinator';
      case 'moderator': return 'Moderator';
      default: return 'Username';
    }
  };

  const getRoleSpecificCards = (role) => {
    switch (role) {
      case 'sermon-planner':
        return [
          {
            title: 'Add Event',
            description: '...',
            icon: '➕',
            onClick: () => navigateTo('/events'),
            bgColor: 'blue-card'
          }
        ];
      case 'prayer-coordinator':
        return [
          {
            title: 'Prayer Alert',
            description: '...',
            icon: '🙏',
            onClick: () => navigateTo('/alert'),
            bgColor: 'blue-card'
          }
        ];
      case 'moderator':
        return [];
      default:
        return [];
    }
  };

  const getCommonCards = () => [
    {
      title: 'Events',
      description: 'Browse and join event',
      icon: '📋',
      onClick: () => navigateTo('/events'),
      bgColor: 'blue-card'
    },
    {
      title: 'Testimony',
      description: 'Share your faith stories',
      icon: '📖',
      onClick: () => navigateTo('/testimonies'),
      bgColor: 'blue-card'
    },
    {
      title: 'Calendar',
      description: 'View upcoming activities',
      icon: '📆',
      onClick: () => navigateTo('/calendar'),
      bgColor: 'blue-card'
    },
    {
      title: 'Account',
      description: 'Manage your profile',
      icon: '👤',
      onClick: () => navigateTo(`/account/${user?.role || 'user'}`),
      bgColor: 'blue-card'
    }
  ];

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const roleSpecificCards = getRoleSpecificCards(user.role);
  const commonCards = getCommonCards();
  const allCards = [...commonCards, ...roleSpecificCards];

  return (
    <div className="desktop-home-page">
      <div className="desktop-home-container">
        {/* Header */}
        <div className="desktop-home-header">
          <div className="header-left">
            <img src={crossLogo} alt="Logo" className="header-logo" />
            <h1 className="header-title">Hi, "{getRoleDisplayName(user.role)}"!</h1>
          </div>
          <button className="sign-out-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {/* Notification Section */}
          <div className="notification-section">
            <div className="notification-header">
              <span className="notification-icon">📌</span>
              <h2>Latest Notification</h2>
            </div>
            {user.role === 'moderator' && (
              <div className="moderator-dashboard">
                <div className="review-section">
                  <h3>Review and Approve</h3>
                  
                  {/* Progress Circle */}
                  <div className="progress-card">
                    <div className="progress-content">
                      <span className="progress-label">Tasks done:</span>
                      <button className="view-log-btn" onClick={() => navigateTo('/review-and-approve')}>
                        View Log
                      </button>
                    </div>
                    <div className="progress-circle">
                      <div className="circle-progress">
                        <span className="progress-percentage">35%</span>
                      </div>
                    </div>
                  </div>

                  {/* In Progress */}
                  <div className="status-section">
                    <h4>In Progress</h4>
                    <div className="status-items">
                      <div className="status-item orange">
                        <div>
                          <p className="item-author">Johnny</p>
                          <p className="item-title">Healing Beyond the Physical</p>
                        </div>
                      </div>
                      <div className="status-item orange">
                        <div>
                          <p className="item-author">Fish Sticks</p>
                          <p className="item-title">From Fear to Faith</p>
                        </div>
                      </div>
                      <div className="status-item orange">
                        <div>
                          <p className="item-author">Jane Doe</p>
                          <p className="item-title">The Day Everything Changed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pending Testimonies */}
                  <div className="status-section">
                    <h4>Pending Testimonies</h4>
                    <div className="status-items">
                      <div className="testimony-item">
                        <div>
                          <p className="item-author">Steph</p>
                          <p className="item-title">Chains Broken</p>
                        </div>
                      </div>
                      <div className="testimony-item highlighted">
                        <div>
                          <p className="item-author">Dino Nuggets</p>
                          <p className="item-title">Grace Found Me</p>
                        </div>
                        <span className="review-note">Previously reviewed by Dory</span>
                      </div>
                      <div className="testimony-item">
                        <div>
                          <p className="item-author">Chicken Soup</p>
                          <p className="item-title">Provision in a Dry Season</p>
                        </div>
                      </div>
                      <div className="testimony-item">
                        <div>
                          <p className="item-author">Oyster</p>
                          <p className="item-title">Peace in the Storm</p>
                        </div>
                        <span className="review-note">Previously reviewed by Barnacles</span>
                      </div>
                    </div>
                  </div>

                  {/* Recently Approved */}
                  <div className="status-section">
                    <h4>Recently Approved Testimonies</h4>
                    <div className="status-items">
                      <div className="approved-item">
                        <div>
                          <p className="item-author">Croissants</p>
                          <p className="item-title">From Darkness to Light</p>
                        </div>
                        <span className="approval-note">Approved by Ratatouille</span>
                      </div>
                      <div className="approved-item">
                        <div>
                          <p className="item-author">Spicy Spaghetti</p>
                          <p className="item-title">God Restored My Family</p>
                        </div>
                        <span className="approval-note">Approved by Ratatouille</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Cards - Only show for non-moderators */}
          {user.role !== 'moderator' && (
            <div className="action-cards-section">
              {allCards.map((card, index) => (
                <div 
                  key={index} 
                  className={`action-card ${card.bgColor}`}
                  onClick={card.onClick}
                >
                  <div className="card-icon-wrapper">
                    <span className="card-icon">{card.icon}</span>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-navigation">
          <div className="nav-item active" onClick={() => navigateTo('/home/user')}>
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Home</span>
          </div>
          <div className="nav-item" onClick={() => navigateTo('/events')}>
            <span className="nav-icon">📋</span>
            <span className="nav-label">Events</span>
          </div>
          <div className="nav-item" onClick={() => navigateTo('/testimonies')}>
            <span className="nav-icon">📖</span>
            <span className="nav-label">Testimonies</span>
          </div>
          <div className="nav-item" onClick={() => navigateTo('/calendar')}>
            <span className="nav-icon">📆</span>
            <span className="nav-label">Calendar</span>
          </div>
          <div className="nav-item" onClick={() => navigateTo(`/account/${user?.role || 'user'}`)}>
            <span className="nav-icon">👤</span>
            <span className="nav-label">Account</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;