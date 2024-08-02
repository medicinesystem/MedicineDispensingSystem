import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header className="header sticky">
      <div className="container">
        <div className="logo" onClick={scrollToTop}>
          <img src={logo} alt="Medicine Dispensing System" />
          <h1 style={{ fontSize: '18px', color: '#000000' }}>
          Medicine Dispensing System
</h1>
        </div>
        <nav className="nav">
          <Link to="/" onClick={scrollToTop}><i className="home-icon">🏠</i></Link>
          <Link to="/login">Log in</Link>
          <Link to="/signup" className="signup-btn">Sign up</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
