import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, UserPlus, Home as HomeIcon } from 'lucide-react';

/**
 * Navigation Bar Component
 */
const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="header-brand">
          <div className="brand-icon">
            <Activity size={22} />
          </div>
          <div className="brand-info">
            <h1>Urine Test Strip Reader</h1>
          </div>
        </Link>

        {/* Top navigation bar */}
        <nav className="header-nav" style={{ alignItems: 'center' }}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <HomeIcon size={16} />
            <span>Home</span>
          </Link>

          <Link to="/register" className={`nav-link ${isActive('/register') ? 'active' : ''}`}>
            <UserPlus size={16} />
            <span>Register Patient</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
