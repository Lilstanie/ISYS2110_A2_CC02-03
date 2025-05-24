import React, { useEffect, useState } from 'react';
import '../style/style.css';
import '../style/review.css';
import sampleImage from '../assets/image.png';

function ReviewApprove() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [submissions, setSubmissions] = useState([]);
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState('review');
  const [reviewSort, setReviewSort] = useState('recent');
  const [approvedSort, setApprovedSort] = useState('recent');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewedByYouOnly, setReviewedByYouOnly] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(true);

  useEffect(() => {
    if (user.role !== 'moderator') {
      window.location.href = '/home/user';
    } else {
      setSubmissions([
        { id: 1, title: 'Peace in the Storm', type: 'Testimony', submittedBy: 'John D.', date: '07/05/2025', content: 'This is a moving testimony about finding peace in hardship.' },
        { id: 2, title: 'Healing Testimony', type: 'Testimony', submittedBy: 'Mary S.', date: '06/05/2025', content: 'A story of healing through prayer.' },
        { id: 3, title: 'Guided by Faith', type: 'Testimony', submittedBy: 'Caleb N.', date: '05/05/2025', content: 'I felt the presence of God during a difficult journey.' },
        { id: 4, title: 'Overcoming Doubt', type: 'Testimony', submittedBy: 'Grace T.', date: '04/05/2025', content: 'Sharing how I moved past doubt and rediscovered my faith.' },
        { id: 5, title: 'The Light in Darkness', type: 'Testimony', submittedBy: 'Liam W.', date: '03/05/2025', content: 'Even in grief, I found light through prayer and community.' }
      ]);

      setApprovedSubmissions([
        { id: 6, title: 'Faith Through Fire', type: 'Testimony', submittedBy: 'Elijah K.', date: '04/05/2025', content: 'A powerful testimony about enduring trials.', approvedBy: 'Moderator', reason: 'Demonstrates strong faith in adversity.' },
        { id: 7, title: 'A Journey Back', type: 'Testimony', submittedBy: 'Rachel B.', date: '02/05/2025', content: 'Returning to faith after years of distance.', approvedBy: 'Moderator', reason: 'Inspiring redemption and return.' }
      ]);
    }
  }, [user.role]);

  const handleApprove = (id) => {
    if (!feedback.trim()) {
      alert('Please provide a reason before approving.');
      return;
    }
    const approved = submissions.find((s) => s.id === id);
    setApprovedSubmissions((prev) => [...prev, { ...approved, approvedBy: user.username, reason: feedback }]);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    setSelectedSubmission(null);
    setFeedback('');
  };

  const handleReject = (id) => {
    if (!feedback.trim()) {
      alert('Please provide a reason before rejecting.');
      return;
    }
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    setSelectedSubmission(null);
    alert(`Submission ${id} rejected with reason: ${feedback}`);
    setFeedback('');
  };

  const total = submissions.length + approvedSubmissions.length;
  const progressPercent = total > 0 ? (approvedSubmissions.length / total) * 100 : 0;

  const sortItems = (items, sortOrder) => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
    });
  };

  const filteredItems = (activeTab === 'review' ? submissions : approvedSubmissions)
    .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(item => !reviewedByYouOnly || item.approvedBy === user.username);

  return (
    <div className="App account-page">
      <div className="account-container">
        {showAlertPopup && (
          <div className="confirmation-overlay">
            <div className="confirmation-popup alert-popup">
              <h2 style={{ color: 'red', textAlign: 'center' }}>URGENT</h2>
              <p style={{ textAlign: 'center' }}><strong>Emergency Prayer Requested</strong></p>
              <p><strong>Initiated by:</strong> Rad</p>
              <p><strong>Reason:</strong> A critical accident</p>
              <p><strong>Location:</strong> Brisbane</p>
              <div className="rsvp-buttons" style={{ justifyContent: 'center', marginTop: '15px' }}>
                <button className="button_red" onClick={() => setShowAlertPopup(false)}>Deny</button>
                <button className="button_blue" onClick={() => setShowAlertPopup(false)}>Approve</button>
              </div>
            </div>
          </div>
        )}

        <h1 className="account-h1">Review and Approve</h1>

        <div className="progress-chart">
          <p><strong>Progress</strong></p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <label>{approvedSubmissions.length} approved / {total} total</label>
        </div>

        <div className="tab-buttons">
          <button className={`tab-button ${activeTab === 'review' ? 'active' : ''}`} onClick={() => setActiveTab('review')}>Needs Review</button>
          <button className={`tab-button ${activeTab === 'approved' ? 'active' : ''}`} onClick={() => setActiveTab('approved')}>Previously Reviewed</button>
        </div>

        <div className="sort-controls">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <label>Sort by:&nbsp;</label>
            <select value={activeTab === 'review' ? reviewSort : approvedSort} onChange={(e) => activeTab === 'review' ? setReviewSort(e.target.value) : setApprovedSort(e.target.value)}>
              <option value="recent">Recently {activeTab === 'review' ? 'Posted' : 'Reviewed'}</option>
              <option value="oldest">Oldest {activeTab === 'review' ? 'Posted' : 'Reviewed'}</option>
            </select>
            {activeTab === 'approved' && (
              <label><input type="checkbox" checked={reviewedByYouOnly} onChange={(e) => setReviewedByYouOnly(e.target.checked)} />&nbsp;Reviewed by You</label>
            )}
          </div>
          <input type="text" placeholder="Search submissions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        <div className="section">
          {sortItems(filteredItems, activeTab === 'review' ? reviewSort : approvedSort).map((item) => (
            <div key={item.id} className="card reviewed-card" onClick={() => setSelectedSubmission(item)}>
              <div className="card-top">
                <p className="submission-type"><strong>{item.type}</strong> | Submitted by {item.submittedBy} on {item.date}</p>
              </div>
              <div className="card-middle">
                <h3 className="submission-title">{item.title}</h3>
              </div>
              {activeTab === 'approved' && (
                <div className="card-bottom styled-approved-info">
                  <p><strong>Reviewed by:</strong> {item.approvedBy}</p>
                  <p><strong>Reason:</strong> {item.reason || 'No reason provided.'}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedSubmission && (
          <div className="confirmation-overlay">
            <div className="confirmation-popup large review-popup">
              <button className="close-btn top-left" onClick={() => setSelectedSubmission(null)}>✖</button>
              <h2 className="popup-title">{selectedSubmission.title}</h2>
              <p className="popup-subheading"><strong>{selectedSubmission.type}</strong> | Submitted by {selectedSubmission.submittedBy} on {selectedSubmission.date}</p>
              <p className="popup-description">{selectedSubmission.content}</p>
              <img src={sampleImage} alt="submission visual" className="event-popup-image" />
              {activeTab === 'review' ? (
                <>
                  <textarea className="popup-description" placeholder="Enter reason for approval or rejection" value={feedback} onChange={(e) => setFeedback(e.target.value)} style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }}></textarea>
                  <div className="rsvp-buttons">
                    <button className="button_red" onClick={() => handleReject(selectedSubmission.id)}>Reject</button>
                    <button className="button_blue" onClick={() => handleApprove(selectedSubmission.id)}>Approve</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="popup-description"><strong>Moderator's Note:</strong> {selectedSubmission.reason || 'No reason provided.'}</p>
                  <p className="popup-description"><strong>Reviewed By:</strong> {selectedSubmission.approvedBy || 'Unknown Moderator'}</p>
                  <button className="button_gray" style={{ marginTop: '10px' }} onClick={() => alert('Request sent to another moderator.')}>Request Another Moderator Review</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewApprove;
