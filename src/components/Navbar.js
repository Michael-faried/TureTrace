import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const BusinesshiddenPages = ['/upload', '/products']; // Add specific page paths here
  const shouldShowBusinessesButton = !BusinesshiddenPages.includes(location.pathname);
  const ReportsButtonShown = ['/upload', '/products'];
  const shouldShowReportsButton = ReportsButtonShown.includes(location.pathname);
  const shouldShowUploadButton = location.pathname === '/products';

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            TrueTrace
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faTimes : faBars} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {shouldShowBusinessesButton && (
              <li className='nav-item'>
                <Link to='/company-login' className='nav-links' onClick={closeMobileMenu}>
                  Businesses
                </Link>
              </li>
            )}
            {shouldShowReportsButton && (
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Reports
                </Link>
              </li>
            )}
            {shouldShowUploadButton && (
              <li className='nav-item'>
                <Link to='/upload' className='nav-links' onClick={closeMobileMenu}>
                  Upload Products
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
