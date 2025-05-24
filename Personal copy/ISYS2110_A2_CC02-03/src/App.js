// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Sidebar from './components/sidebar.js'; //navigation
import Layout from './components/layout.js'; //ensures that the sidebar is always present

import Login from './pages/login.js';   // Login page
import Home from './pages/home.js';   // Home page

import ReviewApprove from './pages/reviewAndApprove.js'; // Review and Approve page
import ProtectedRoute from './components/protectedRoute.js';


import Account from './pages/account.js';  // Account page
import Event from './pages/events.js';  // Event page
import Calendar from './pages/calendar.js';  // Calendar page

import Testimonies from './pages/testimonies.js';  // Testimonies page
import Alert from './pages/alert.js';  // Alert page

import './style/style.css';
import SubmitTestimony from "./pages/submitTestimony"; // CSS file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} /> 

        {/* Routes with sidebar */}
        <Route element={<Layout />}>
          <Route path="/home/:username" element={<Home />} /> 
          <Route path="/alert" element={<Alert />} />
          <Route path="/events" element={<Event />} />
          <Route
            path="/review-and-approve"
            element={
              <ProtectedRoute element={ReviewApprove} requiredRole="moderator" />
            }
          />
          <Route path="/testimonies" element={<Testimonies />} />
          <Route path="/submit-testimony" element={<SubmitTestimony />} />
          <Route path="/account/:role" element={<Account />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

