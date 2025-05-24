import React, { useState, useEffect } from 'react';
import '../style/style.css';
import '../style/events.css';
import sampleImage from '../assets/image.png';

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRSVP, setShowRSVP] = useState(false);
  const [activeDate, setActiveDate] = useState('May 12');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [editEventData, setEditEventData] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isSermonPlanner = user.role === 'sermon-planner';

  const dates = [
    { label: 'May 10', day: 'Sat' },
    { label: 'May 11', day: 'Sun' },
    { label: 'May 12', day: 'Mon' },
    { label: 'May 13', day: 'Tues' },
    { label: 'May 14', day: 'Weds' },
    { label: 'May 15', day: 'Thurs' },
    { label: 'May 16', day: 'Fri' },
    { label: 'May 17', day: 'Sat' },
    { label: 'May 18', day: 'Sun' },
    { label: 'May 19', day: 'Mon' },
    { label: 'May 20', day: 'Tues' }
  ];

  useEffect(() => {
    const currentIndex = dates.findIndex((d) => d.label === activeDate);
    if (currentIndex >= 2 && currentIndex <= dates.length - 3) {
      setStartIndex(currentIndex - 2);
    } else if (currentIndex < 2) {
      setStartIndex(0);
    } else {
      setStartIndex(Math.max(0, dates.length - 5));
    }
  }, [activeDate]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Harvest of Hope',
      date: 'May 12',
      time: '9 - 11 am',
      location: 'Sydney',
      category: 'Family and Community',
      spots: 5,
      description: `A joyful community gathering celebrating faith, gratitude, and the blessings of the season.`
    },
    {
      id: 2,
      title: 'Fall into Faith',
      date: 'May 12',
      time: '12 - 2 pm',
      location: 'Sydney ICC',
      category: 'Seasonal',
      spots: 0,
      description: `details details details.`
    },
    {
      id: 3,
      title: 'Upper Room Gathering',
      date: 'May 12',
      time: '6 - 8 am',
      location: 'Singapore',
      category: 'Worship and Prayer',
      spots: 1,
      description: `details details details.`
    },
    {
      id: 4,
      title: 'Night of Worship',
      date: 'May 12',
      time: '6 - 9 pm',
      location: 'New York',
      category: 'Worship and Prayer',
      spots: 22,
      description: `details details details.`
    },
    {
      id: 5,
      title: 'Youth Revival',
      date: 'May 13',
      time: '3 - 6 pm',
      location: 'Brisbane',
      category: 'Youth',
      spots: 10,
      description: `details details details.`
    },
    {
      id: 6,
      title: 'Outreach Celebration',
      date: 'May 13',
      time: '10 am - 12 pm',
      location: 'Sydney',
      category: 'Outreach',
      spots: 8,
      description: `details details details.`
    }
  ]);

  const openEvent = (event) => {
    setSelectedEvent(event);
    setShowRSVP(false);
  };

  const closePopup = () => {
    setSelectedEvent(null);
    setShowRSVP(false);
    setShowEditEvent(false);
  };

  const filteredEvents = events.filter((e) => {
    const matchesDate = e.date === activeDate;
    const matchesLocation = locationFilter === 'All' || e.location.includes(locationFilter);
    const matchesType = typeFilter === 'All' || e.category === typeFilter;
    return matchesDate && matchesLocation && matchesType;
  });

  const visibleDates = dates.slice(startIndex, startIndex + 5);

  const shiftLeft = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const shiftRight = () => {
    if (startIndex + 5 < dates.length) setStartIndex(startIndex + 1);
  };

  const handleEditClick = (event) => {
    setEditEventData({ ...event });
    setShowEditEvent(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEvents(events.map(ev => ev.id === editEventData.id ? editEventData : ev));
    setShowEditEvent(false);
    setSelectedEvent(null);
  };


  return (
    <div className="App account-page">
      <div className="account-container">
        <div className="events-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: '24px' }}>
          <h1 style={{ margin: '0 auto' }}>Events</h1>
          {isSermonPlanner && (
            <button
              className="button_red"
              style={{ position: 'absolute', left: 0 }}
              onClick={() => setShowAddEvent(true)}
            >
              + Add Event
            </button>
          )}
          <button
            className="view-upcoming-btn"
            style={{ position: 'absolute', right: 0 }}
            onClick={() => window.location.href = '/calendar'}
          >
            View Upcoming
          </button>
        </div>

        <div className="calendar-scroll" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <button className="calendar-arrow" onClick={shiftLeft} disabled={startIndex === 0} aria-label="Previous Dates">◀</button>
          {visibleDates.map(({ label, day }) => (
            <div
              key={label}
              className={`calendar-box ${activeDate === label ? 'active' : ''}`}
              onClick={() => setActiveDate(label)}
            >
              <p className="calendar-date">{label.split(' ')[1]}</p>
              <p className="calendar-month">{label.split(' ')[0]}</p>
              <p className="calendar-day">{day}</p>
            </div>
          ))}
          <button className="calendar-arrow" onClick={shiftRight} disabled={startIndex + 5 >= dates.length} aria-label="Next Dates">▶</button>
        </div>

        <div className="filter-bar">
          <select onChange={(e) => setLocationFilter(e.target.value)} value={locationFilter}>
            <option value="All">All Locations</option>
            <option value="Sydney">Sydney</option>
            <option value="Singapore">Singapore</option>
            <option value="New York">New York</option>
            <option value="Brisbane">Brisbane</option>
          </select>

          <select onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}>
            <option value="All">All Types</option>
            <option value="Family and Community">Family and Community</option>
            <option value="Worship and Prayer">Worship and Prayer</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Outreach">Outreach</option>
            <option value="Youth">Youth</option>
          </select>

          <button className="reset-button" onClick={() => {
            setLocationFilter('All');
            setTypeFilter('All');
          }}>
            Reset Filters
          </button>
        </div>

        <p style={{ marginTop: '10px' }}>Click event to view details and RSVP</p>

        {filteredEvents.length === 0 ? (
          <p>No events match your filters.</p>
        ) : (
          filteredEvents.map((event) => (
            <div className="card event-card" key={event.id} onClick={() => openEvent(event)}>
              <div className="event-header">
                <p className="category">{event.category}</p>
                <p className="event-time">🕒 {event.time}</p>
              </div>
              <h3>{event.title}</h3>
              <p className="location">📍 {event.location}</p>
              <div className="event-footer">
                <span className={`spot-pill ${event.spots === 0 ? 'no-spots' : ''}`}>
                  {event.spots > 0 ? `${event.spots} Spot${event.spots > 1 ? 's' : ''} Available` : 'No Spots Available'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedEvent && !showRSVP && (
        <div className="confirmation-overlay">
          <div className="confirmation-popup large event-popup">
            <button className="close-btn large-x" onClick={closePopup}>✖</button>
            <div className="inner-close-container">
              <button className="inner-close-btn" onClick={closePopup}>✖</button>
            </div>
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.description || "Details coming soon."}</p>
            <div className="event-info-row">
              <span className="info-location">📍 {selectedEvent.location}</span>
              <span className="info-time">🕒 {selectedEvent.time}</span>
            </div>
            <img src={sampleImage} alt={selectedEvent.title} className="event-popup-image" />
            <div className="rsvp-buttons">
              <button className="button_blue" onClick={() => setShowRSVP(true)}>RSVP</button>
              {isSermonPlanner && (
                <button className="button_gray" onClick={() => handleEditClick(selectedEvent)}>Edit</button>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedEvent && showRSVP && (
        <div className="confirmation-overlay">
          <div className="confirmation-popup large">
            <button className="close-btn large-x" onClick={closePopup}>✖</button>
            <h3>RSVP for {selectedEvent.title}</h3>
            <form>
              <input className="login-input" type="text" placeholder="First Name" required />
              <input className="login-input" type="text" placeholder="Last Name" required />
              <input className="login-input" type="email" placeholder="Email" required />
              <input className="login-input" type="tel" placeholder="Phone" required />
              <input className="login-input" type="number" placeholder="How many guests will be joining you?" />
              <input className="login-input" type="text" placeholder="Church affiliation (if relevant)" />
              <div className="rsvp-buttons">
                <button type="button" className="button_gray" onClick={closePopup}>Discard</button>
                <button type="submit" className="button_blue">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddEvent && (
        <div className="confirmation-overlay">
          <div className="confirmation-popup large">
            <button className="close-btn large-x" onClick={() => setShowAddEvent(false)}>✖</button>
            <h3>Add New Event</h3>
            <form>
              <input className="login-input" type="text" placeholder="Event Title" required />
              <input className="login-input" type="text" placeholder="Date (e.g. May 12)" required />
              <input className="login-input" type="text" placeholder="Time" required />
              <input className="login-input" type="text" placeholder="Location" required />
              <input className="login-input" type="text" placeholder="Category" required />
              <input className="login-input" type="number" placeholder="Number of Spots" required />
              <textarea className="login-input" placeholder="Description"></textarea>
              <input className="login-input" type="file" accept="image/*" />
              <p style={{ fontSize: '0.8rem', color: 'gray', marginTop: '5px' }}>* Accepted file types: JPG, PNG, GIF</p>
              <div className="rsvp-buttons">
                <button type="button" className="button_gray" onClick={() => setShowAddEvent(false)}>Cancel</button>
                <button type="submit" className="button_blue">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showEditEvent && isSermonPlanner && editEventData && (
        <div className="confirmation-overlay">
          <div className="confirmation-popup large">
            <button className="close-btn large-x" onClick={closePopup}>✖</button>
            <h3>Edit Event</h3>
            <form onSubmit={handleEditSubmit}>
              <input className="login-input" type="text" placeholder="Event Title" value={editEventData.title} onChange={(e) => setEditEventData({ ...editEventData, title: e.target.value })} required />
              <input className="login-input" type="text" placeholder="Date" value={editEventData.date} onChange={(e) => setEditEventData({ ...editEventData, date: e.target.value })} required />
              <input className="login-input" type="text" placeholder="Time" value={editEventData.time} onChange={(e) => setEditEventData({ ...editEventData, time: e.target.value })} required />
              <input className="login-input" type="text" placeholder="Location" value={editEventData.location} onChange={(e) => setEditEventData({ ...editEventData, location: e.target.value })} required />
              <input className="login-input" type="text" placeholder="Category" value={editEventData.category} onChange={(e) => setEditEventData({ ...editEventData, category: e.target.value })} required />
              <input className="login-input" type="number" placeholder="Spots" value={editEventData.spots} onChange={(e) => setEditEventData({ ...editEventData, spots: +e.target.value })} required />
              <textarea className="login-input" placeholder="Description" value={editEventData.description || ''} onChange={(e) => setEditEventData({ ...editEventData, description: e.target.value })}></textarea>
              <div className="rsvp-buttons">
                <button type="button" className="button_gray" onClick={closePopup}>Cancel</button>
                <button type="submit" className="button_blue">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
