import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../backgrounds/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [companyName, setCompanyName] = useState('');

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
    const storedCompanyName = localStorage.getItem('companyName');
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    }
  }, []);

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const BusinesshiddenPages = ['/upload', '/products', '/userreport', '/reported-products']; // Add specific page paths here
  const shouldShowBusinessesButton = !BusinesshiddenPages.includes(location.pathname);
  const ReportsButtonShown = ['/upload', '/products'];
  const shouldShowReportsButton = ReportsButtonShown.includes(location.pathname);
  const shouldShowUploadButton = location.pathname === '/products';
  const shouldShowCompanyNameButton = location.pathname === '/reported-products' || location.pathname === '/upload';
  const shouldShowLogoutButton = location.pathname !== '/';

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src={logo} alt='Logo' className='logo-image' />
            TrueTrace
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faTimes : faBars} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {shouldShowBusinessesButton && (
              <li className='nav-item'>
                <Link to='/company-login' className='nav-links' onClick={closeMobileMenu}>
                  Businesses
                </Link>
              </li>
            )}
            {shouldShowReportsButton && (
              <li className='nav-item'>
                <Link to='/reported-products' className='nav-links' onClick={closeMobileMenu}>
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
            {shouldShowCompanyNameButton && (
              <li className='nav-item'>
                <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                  Products
                </Link>
              </li>
            )}
            {shouldShowLogoutButton && (
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Logout
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
