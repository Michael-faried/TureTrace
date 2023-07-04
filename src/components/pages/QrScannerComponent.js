import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { verify } from '../../web3Client';
import "../pages/UserLoggedIn.css"
const QRScannerComponent = () => {
  const [scannedResult, setScannedResult] = useState(null);
  const [isAuthentic, setIsAuthentic] = useState(false);
  const [productData, setProductData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScannedResult(data);
      handleScanned(data);
    }
  };

  const handleError = (error) => {
    console.error('Error scanning QR code:', error);
  };

  const handleScanned = (scannedData) => {
    verify(scannedData).then((res) => {
      console.log(res);
      if (
        res[0] !== 0 &&
        res[1] !== '' &&
        res[2] !== '' &&
        res[3] !== '' &&
        res[4] !== '' &&
        res[5] !== ''
      ) {
        setIsAuthentic(true);
        setProductData(res);
      } else {
        setIsAuthentic(false);
      }
    });
  };

  const handleReset = () => {
    setScannedResult(null);
    setIsAuthentic(false);
    setProductData(null);
  };

  return (
    <>
      {!scannedResult && (
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{
              width: '100%',
              maxWidth: '350px',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              margin: '20px auto 0',
              paddingTop: '10px',
            }}
          />
        </div>
      )}

      {scannedResult && (
        <div className='product-result-container'>
          <h1>Product is {isAuthentic ? 'Authentic' : 'Fake'}</h1>
          {isAuthentic && (
            <div className='authentic-product-container'>
              <img
                src={productData[5]}
                alt='Authentic Product'
                className='authentic-product-image'
              />
              <div className='product-details'>
                <p style={{ fontSize: '1.5rem' }}><strong>Product ID: </strong> {productData[0]}</p>
                <p style={{ fontSize: '1.5rem' }}><strong>Product Name: </strong> {productData[1]}</p>
                <p style={{ fontSize: '1.5rem' }} ><strong>Product Model: </strong> {productData[2]}</p>
                <p style={{ fontSize: '0.9rem' }} >{productData[3]}</p>
              </div>
            </div>
          )}

          <button onClick={handleReset}>Scan Again</button>
        </div>
      )}
    </>
  );
};

export default QRScannerComponent;
