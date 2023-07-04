import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../Button';
import '../pages/UserLoggedIn.css';
import QrScanner from 'qr-scanner';
import { verify, init } from '../../web3Client';
import { useNavigate } from 'react-router-dom';
import QrScannerComponent from './QrScannerComponent';

const UserLoggedIn = (props) => {
  useEffect(() => {
    // Initialize web3 when the component mounts
    init();
  }, []);

  const [qrvalue, setQrvalue] = useState('');
  const navigate = useNavigate();
  const [state, setState] = useState('');
  const [resstate, setResState] = useState('');
  const [isAuthentic, setIsAuthentic] = useState(false);
  const [showReportButton, setShowReportButton] = useState(true);
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    setState('');
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    readQcode(event);
  };

  const readQcode = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => {
        verify(result.data).then((res) => {
          console.log(res);
          if (res[0] !== 0 && res[1] !== '' && res[2] !== '' && res[3] !== '' && res[4] !== '' && res[5] !== '') {
            setState(res);
            setResState(res);
            setIsAuthentic(true); // Update isAuthentic based on the verification result
            setShowReportButton(false); // Hide the report button if the product is authentic
          } else {
            setState(res);
            setIsAuthentic(false);
            // setShowReportButton(true); // Show the report button if the product is fake
          }
        });
      })
      .catch((e) => console.log(e));
  };

  const handleReport = () => {
    navigate('/userreport'); // Navigate to the "reports" page
  };

  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get('productName');

  return (
    <div className='land-hero-container'>
      <video src='/videos/video.mp4' autoPlay loop muted />
      <h1>SCAN PRODUCT TO BEGIN</h1>
      <div className='hero-btn-container'>
        <div className='hero-btns'>
          <button className='btn btn--outline btn--large' onClick={handleClick}>
            UPLOAD QR CODE HERE
          </button>
          <button className='btn btn--outline btn--large' onClick={handleReport}>
            REPORT FAKE PRODUCT
          </button>
        </div>
        {!state && <QrScannerComponent />}
      </div>
      <input type='file' accept='image/*' ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
  
      {state && (
        <div className='product-result-container'>
          <h1>Product is {isAuthentic ? 'Authentic' : 'Fake'}</h1>
          {isAuthentic && (
            <div className='authentic-product-container'>
              <img src={resstate[5]} alt='Authentic Product' className='authentic-product-image' />
              <div className='product-details'>
                <p style={{ fontSize: '1.5rem' }}><strong>Product ID: </strong> {resstate[0]}</p>
                <p style={{ fontSize: '1.5rem' }}><strong>Product Name: </strong> {resstate[1]}</p>
                <p style={{ fontSize: '1.5rem' }} ><strong>Product Model: </strong> {resstate[2]}</p>
                <p style={{ fontSize: '0.9rem' }} >{resstate[3]}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserLoggedIn;

