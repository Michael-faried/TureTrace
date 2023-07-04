import React, { useState } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false); // new state variable

  const navigateToLanding = () => {
    navigate('/landing');
  };

  const navigateToLogin = () => {
    navigate('/user-login');
  };

  const handleLearnMoreClick = () => {
    setShowVideo(true);
  };

  return (
    <div className='hero-container'>
      <div className='video-container'>
        {showVideo ? ( // conditionally render the video
          <video src='/videos/scan_qr_animation.mp4' autoPlay loop muted playsInline />
        ) : (
          <video src='/videos/Company.mp4' autoPlay loop muted playsInline />
        )}
      </div>

      <div className='hero-content'>
        <h1>DECENTRALIZED PRODUCT AUTHENTICATION</h1>
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
            onClick={handleLearnMoreClick} // add click handler
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
    </div>
  );
}

export default HeroSection;
