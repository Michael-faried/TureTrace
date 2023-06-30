import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import {Routes, Route, useNavigate} from 'react-router-dom';


function HeroSection() {
  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate('/landing');
  };

  const navigateToLogin = () => {
    navigate('/user-login');
  };
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video.mp4' autoPlay loop muted /> */}
      <h1>DECENTRALIZED PRODUCT AUTHENTICATION</h1>
      <div className='hero-btns'>
      <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          LEARN MORE
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={navigateToLogin}
        >
          GET STARTED 
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
