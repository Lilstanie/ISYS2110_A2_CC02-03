// pages/alert.js
import React, { useState } from 'react';
import '../style/style.css';
import '../style/alert.css';  // create this for the alert-specific styles

const alertData = [
  {
    id: 1,
    icon: '⚠️',
    title: 'Emergency Prayer Alert',
    initiatedBy: 'Rad',
    reason: 'A critical accident',
    location: 'Brisbane',
    buttonText: 'Acknowledge',
    borderColor: '#d32f2f'
  },
  {
    id: 2,
    icon: 'ℹ️',
    title: 'Head’s Up',
    initiatedBy: 'Admin',
    reason: 'Maintenance tonight',
    location: 'All Users',
    buttonText: 'Got It',
    borderColor: '#1976d2'
  },
  {
    id: 3,
    icon: '✅',
    title: 'Daily Reminder',
    initiatedBy: 'System',
    reason: 'Submit your testimonies',
    location: 'Add Testimony',
    buttonText: 'Okay',
    borderColor: '#388e3c'
  },
];

export default function Alert() {
  const [alerts, setAlerts] = useState(alertData);

  return (
    <div className="alert-page">
      <h1>Alert</h1>
      {alerts.map(alert => (
        <div
          key={alert.id}
          className="alert-box"
          style={{ borderColor: alert.borderColor }}
        >
          <div className="alert-header">
            <span className="alert-icon">{alert.icon}</span>
            <h2 className="alert-title">{alert.title}</h2>
            <button
              className="alert-close"
              onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
            >✖</button>
          </div>
          <div className="alert-body">
            <p><strong>Initiated by:</strong> {alert.initiatedBy}</p>
            <p><strong>Reason:</strong> {alert.reason}</p>
            <p><strong>Location:</strong> {alert.location}</p>
          </div>
          <div className="alert-footer">
            <button
              className="alert-action"
              style={{ backgroundColor: alert.borderColor }}
            >
              {alert.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}