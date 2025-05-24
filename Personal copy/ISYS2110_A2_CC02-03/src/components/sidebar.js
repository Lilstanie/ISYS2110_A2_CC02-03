import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../style/style.css';
import '../style/sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <hr />

      <NavLink to="/home/user" className="nav-link">Home</NavLink>
      <NavLink to="/alert" className="nav-link">Alert</NavLink>
      <NavLink to="/events" className="nav-link">Events</NavLink>
      <NavLink to="/calendar" className="nav-link">Calendar</NavLink>

      {/* Only show if user is a moderator */}
      {user?.role === 'moderator' && (
        <NavLink to="/review-and-approve" className="nav-link">Review & Approve</NavLink>
      )}

      <NavLink to="/testimonies" className="nav-link">Testimonies</NavLink>
      <NavLink to={`/account/${user?.role || 'user'}`} className="nav-link">Account</NavLink>

      <hr />
      <Link to="/login" onClick={handleLogout} className="nav-link logout-button">
        Logout
      </Link>
    </div>
  );
}

export default Sidebar;
