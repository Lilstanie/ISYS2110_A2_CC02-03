import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/style.css';
import '../style/account.css';

function Account() {
  const [user, setUser] = useState(null);
  const [testimonies, setTestimonies] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('testimonies');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setTempEmail(parsed.email);
      setTempPhone(parsed.phone);
    }

    // Mock data
    setTestimonies([
      { id: 1, title: 'Peace in the Storm', date: '07/05/2025', status: 'Pending approval' },
      { id: 2, title: 'My Journey', date: '07/04/2025', status: 'Approved' },
      { id: 3, title: 'What is god?', date: '07/04/2025', status: 'Approved' }
    ]);

    setHistory([
      { id: 1, type: 'Testimony', title: 'Peace in the Storm', date: '07/05/2025' },
      { id: 2, type: 'Event', title: 'Harvest of Hope', date: '07/05/2025' },
      { id: 3, type: 'Event', title: 'Upper Room Gathering', date: '06/05/2025' }
    ]);
  }, []);

  const maskEmail = (email) => {
    const [userPart, domain] = email.split('@');
    return `${userPart[0]}*******@${domain}`;
  };

  const maskPhone = (phone) => {
    return phone.slice(0, 4) + '******';
  };

  const handleSaveEdit = () => {
    const updatedUser = {
      ...user,
      email: tempEmail,
      phone: tempPhone,
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  if (!user) {
    return <div className="App"><p>Loading user data...</p></div>;
  }

  const results = (activeTab === 'testimonies' ? testimonies : history).filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App account-page">
      <div className="account-container">
        <h1 className="account-h1">Hello {user.username}</h1>

        <div className="section-header">
          <h3>Your Details</h3>
          <button className="icon-button" onClick={() => setIsEditing(true)} aria-label="Edit details">✏️</button>
        </div>

        <div className="user-box">
          <p className="details-line">Email: {maskEmail(user.email)}</p>
          <p className="details-line">Phone: {maskPhone(user.phone)}</p>
        </div>

        {isEditing && (
          <div className="edit-popup user-box">
            <h3>Edit Details</h3>
            <input
              className="login-input"
              type="email"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              placeholder="New email"
            />
            <input
              className="login-input"
              type="text"
              value={tempPhone}
              onChange={(e) => setTempPhone(e.target.value)}
              placeholder="New phone"
            />
            <div>
              <button className="button_blue" onClick={handleSaveEdit}>Save</button>
              <button className="button_red" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="tab-buttons">
          <button
            className="tab-button"
            onClick={() => navigate('/testimonies')}
          >
            Your Testimonies
          </button>
          <button
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            View History
          </button>
          <input
            type="text"
            className="search-input"
            placeholder={`Search ${activeTab}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginLeft: 'auto' }}
          />
        </div>

        {/* Display based on tab */}
        <div className="section">
          {results.map((item) => (
            <div key={item.id} className="card">
              <p><strong>{item.title}</strong></p>
              <p>{item.date}</p>
              {item.status && <p className="status">Status: {item.status}</p>}
              {item.type && <p><strong>{item.type}</strong></p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
