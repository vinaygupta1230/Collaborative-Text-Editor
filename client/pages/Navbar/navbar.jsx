// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import CSS for styling
// import {image} from '../../src/assets/textEditor.png'

const Navbar = ({ userName, userEmail, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={"../../src/assets/textEditor.png"} alt="Text Editor Logo" />
        <span>Text Editor</span>
      </div>
      {/* <div className="navbar-user">
        <span>{userName}</span>
        <span>{userEmail}</span>
      </div> */}
      <div className="navbar-actions">
        <Link to="/" onClick={onLogout}>Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
