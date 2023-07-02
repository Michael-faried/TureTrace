import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import '../pages/UserLoggedIn.css';
import QrScanner from 'qr-scanner';
import { verify } from '../../web3Client';

const UserLoggedIn = (props) => {
  const [qrvalue, setQrvalue] = useState('');
  const [state, setState] = useState('');
  const [resstate, setResState] = useState('');
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
      if (res[0] != 0 && res[1]!="" && res[2]!="" && res[3]!="" && res[4]!="" && res[5]!="") 
      {
        setState(res);
        setResState(res);
        console.log("result: ",res);
        setIsAuthentic(true); // Update isAuthentic based on the verification result
      }
      else
      {
        setState(res);
        console.log("result: ",res);
        setIsAuthentic(false);
      }
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
              <img src={resstate[5]} alt='Authentic Product' className='authentic-product-image' />
              <p className='dummy-text'>Product ID: {resstate[0]}</p>
              <p className='dummy-text'>Product Name: {resstate[1]}</p>
              <p className='dummy-text'>Product Model: {resstate[2]}</p>
              <p className='dummy-text'>{resstate[3]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserLoggedIn;
