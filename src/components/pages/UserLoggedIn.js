import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import '../pages/UserLoggedIn.css';
import QrScanner from 'qr-scanner';
import { verify } from '../../web3Client';

const UserLoggedIn = (props) => {
  const [qrvalue, setQrvalue] = useState('');
  const [state, setState] = useState('');
  const [isAuthentic, setIsAuthentic] = useState(false);

  // QR Code Read function
  const readQcode = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => setQrvalue(result.data))
      .catch((e) => console.log(e));
    verify(qrvalue).then((res) => {
      setState(res);
      setIsAuthentic(res === 0); // Update isAuthentic based on the verification result
    });
  };

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    readQcode(event);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const productName = urlParams.get('productName');

  return (
    <div className='land-hero-container'>
      <h1>SCAN PRODUCT TO BEGIN</h1>
      <div className='hero-btns'>
        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large' onClick={handleClick}>
          UPLOAD QR CODE
        </Button>
        <input
          type='file'
          accept='image/*'
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>
      {state !== '' && (
        <div className='product-result-container'>
          <h1>Product is {isAuthentic ? 'Authentic' : 'Fake'}</h1>
          {isAuthentic && (
            <div className='authentic-product-container'>
              <img src="https://source.unsplash.com/random?wallpapers" alt='Authentic Product' className='authentic-product-image' />
              <p className='dummy-text'>Dummy text for authentic product</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserLoggedIn;
