import React, { useState, useEffect } from 'react';
import '../style/style.css';
import '../style/calendar.css';


function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [cancelEventTitle, setCancelEventTitle] = useState(null);
  const today = new Date();
  const todayDate = today.getDate();

  const eventsByDate = {
    3: ['Mighty Men Summit', 'Rooted & Rising'],
    15: ['Youth Rally'],
    21: ['Prayer Breakfast', 'Community Outreach']
  };

  const handleCancelClick = (title) => {
    setCancelEventTitle(title);
    setShowConfirmCancel(true);
  };

  const confirmCancel = () => {
    alert(`RSVP for "${cancelEventTitle}" has been cancelled.`);
    setShowConfirmCancel(false);
    setCancelEventTitle(null);
  };

  const getDots = (day) => {
    const events = eventsByDate[day] || [];
    return events.map((_, idx) => <div key={idx} className="event-dot"></div>);
  };

  return (
    <div className="App account-page">
      <div className="account-container">
        <div className="events-header" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '12px' }}>
          <button className="close-btn back-large" onClick={() => window.location.href = '/events'}>←</button>
          <h1>Your Upcoming Events</h1>
        </div>

        {/* Mock Calendar */}
        <div className="calendar-placeholder">
          <div className="calendar-header">
            <button className="calendar-nav">←</button>
            <h4>May 2025</h4>
            <button className="calendar-nav">→</button>
          </div>
          <div className="calendar-grid">
            {["Mo","Tu","We","Th","Fr","Sa","Su"].map((day, idx) => (
              <div key={idx} className="calendar-day-header">{day}</div>
            ))}
            {[...Array(2)].map((_, i) => (
              <div key={`empty-${i}`} className="calendar-day-empty">.</div>
            ))}
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const isToday = today.getMonth() === 4 && today.getFullYear() === 2025 && todayDate === day;
              return (
                <div
                  key={day}
                  className={`calendar-day-box${selectedDate === day ? ' selected' : ''}${isToday ? ' today' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  {day}
                  <div className="event-dots-container">
                    {getDots(day)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Events for selected day */}
        {eventsByDate[selectedDate]?.map((title, idx) => (
          <div key={idx} className="card event-card calendar-event-card">
            <div className="event-card-top">
              <p className="category">Event</p>
              <p className="event-time">🕒 9 - 11 am</p>
            </div>
            <h3>{title}</h3>
            <div className="location-row">
  <p className="location">📍 Sydney</p>
  <button className="button_blue" onClick={() => handleCancelClick(title)}>Cancel RSVP</button>
</div>
          </div>
        ))}

        {/* Confirmation of Cancellation */}
        {showConfirmCancel && (
          <div className="confirmation-overlay">
            <div className="confirmation-popup">
              <p>Once you cancel, your booking will be permanently removed.</p>
              <p><strong>Are you sure you want to cancel?</strong></p>
              <div className="rsvp-buttons">
                <button className="button_blue" onClick={() => setShowConfirmCancel(false)}>No</button>
                <button className="button_red" onClick={confirmCancel}>Yes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
