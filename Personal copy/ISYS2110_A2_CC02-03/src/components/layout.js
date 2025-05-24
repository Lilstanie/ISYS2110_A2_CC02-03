import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar'; 
import '../style/style.css';
import '../style/layout.css';


const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
