import React, { useState, useEffect } from 'react';
import Popup from '../Popup';
import image from '../../backgrounds/back3.png';
import { init, UploadProducts_call, UploadProducts_send } from '../../web3Client';
import Papa from 'papaparse';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useContext } from 'react';
import { CompanyContext } from '../CompanyContext';

function Upload() {
  useEffect(() => {
    init();
  }, []);

  const [buttonPup, setButtonPup] = useState(false);
  const { companyName } = useContext(CompanyContext);
  let companyName2 = localStorage.getItem('companyName');
  if (companyName2 == null) {
    console.log('company name is null');
  }

  const [csvData, setCSVData] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const dataArray = results.data.map((row) => Object.values(row));

        if (dataArray[0].some((val) => !val)) {
          dataArray.shift();
        }
        let Products = [];
        console.log(dataArray);

        for (let i = 0; i < dataArray.length - 1; i++) {
          Products.push({
            id: dataArray[i][0],
            name: dataArray[i][1],
            model: dataArray[i][2],
            description: dataArray[i][3],
            companyName: companyName2,
            imageLink: dataArray[i][4],
          });
        }

        UploadProducts_send(Products);
        const hashedArray = await UploadProducts_call(Products);
        console.log(hashedArray);

        setCSVData(hashedArray);
        setUploadedFileName(file.name);
        window.alert('CSV file uploaded successfully!'); // Display alert
      },
      error: (error) => {
        console.error('Error parsing CSV file:', error);
      },
    });
  };

  const handleDownloadQRs = async () => {
    const zip = new JSZip();

    for (let i = 0; i < csvData.length; i++) {
      const text = csvData[i];

      const canvas = document.createElement('canvas');
      await QRCode.toDataURL(text, { width: 256, height: 256 })
        .then((url) => {
          const img = new Image();
          img.src = url;
          return new Promise((resolve, reject) => {
            img.onload = () => {
              canvas.width = 256;
              canvas.height = 256;
              const context = canvas.getContext('2d');
              context.drawImage(img, 0, 0, 256, 256);
              canvas.toBlob((blob) => {
                zip.file(`${text}.png`, blob);
                resolve();
              });
            };
            img.onerror = reject;
          });
        })
        .catch((error) => {
          console.error('Error generating QR code:', error);
        });
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'qr_codes.zip');
    });
  };

  const companyNameStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'white', // Add this line to set the text color to white
  };

  const chooseFileButtonStyle = {
    border: '2px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f8f8f8',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  return (
    <div className="popup" style={{  backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <video src='/videos/video.mp4' autoPlay loop muted />
      <div className="popup-inner">
        <h1 style={companyNameStyle}>{companyName2}</h1>
        <main>
          <h1 style={{ color: 'white' }}>Click to Upload a Product(s)</h1>
          <br />
          <input type="file" id="fileUpload" onChange={handleFileUpload} style={{ display: 'none' }} />
          <label className='btn btn--outline btn--large' htmlFor="fileUpload" style={{ height: '21px', marginRight: '10px', color: 'white' }}>
            Choose File
          </label>
          <span style={{ color: 'white' }}>{uploadedFileName && `Uploaded File: ${uploadedFileName}`}</span>
          <Popup trigger={buttonPup} setTrigger={setButtonPup}></Popup>
          {csvData.length > 0 && (
            <button style={{ height: '38px', marginRight: '10px', marginLeft: '15px', marginTop: '15px',color: 'white' }} className='btn btn--outline btn--large' onClick={handleDownloadQRs}>
              Download QR Codes
            </button>
          )}
        </main>
      </div>
    </div>
  );
}

export default Upload;
