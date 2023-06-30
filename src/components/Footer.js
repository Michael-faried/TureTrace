import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Team Members:
        </p>
        <p className='footer-subscription-text'>
          Philip Wagih, Michael Farid, Kermina Ashraf, Mario Mamdouh, Michael Medhat
        </p>
      </section>
    </div>
  );
}

export default Footer;
