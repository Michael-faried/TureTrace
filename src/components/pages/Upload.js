import React, { useState, useEffect } from 'react';
import Popup from '../Popup';
import image from '../../backgrounds/back3.png';
import { init, UploadProducts } from '../../web3Client';
import QrScreen from '../pages/Qrscreen';
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
  const [csvData, setCSVData] = useState([]);
  const [showQrScreen, setShowQrScreen] = useState(false); // Track the state for showing the QR screen

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const dataArray = results.data.map((row) => Object.values(row));
        setCSVData(dataArray);
        setShowQrScreen(true); // Show the QR screen when CSV is uploaded
        // console.log(dataArray[0]); 
        const hashedArray = []; 
        for(let i =0; i<5; i++)
        {
          UploadProducts(dataArray[i][0],dataArray[i][1],dataArray[i][2],dataArray[i][3],companyName,dataArray[i][4]).then((res) => {
            console.log(res);
          })
        }
        // dataArray -> 2d array holding csv data
      },
      error: (error) => {
        console.error('Error parsing CSV file:', error);
      },
    });
  };

  const handleDownloadQRs = async () => {
    const zip = new JSZip();

    for (let i = 0; i < csvData.length; i++) {
      const text = csvData[i][0];

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

  return (
    <div className="popup" style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className="popup-inner">
        <main>
          <h1>{companyName}</h1>
          <h1>Click to Upload a product(s)</h1>
          <br />
          <button onClick={() => setButtonPup(true)}>Upload Product Manually</button>
          <input type="file" onChange={handleFileUpload} />
          <Popup trigger={buttonPup} setTrigger={setButtonPup}></Popup>
          {/* Conditionally render the QR screen and the "Download QR Codes" button */}
          {showQrScreen && (
            <>
              <QrScreen texts={csvData.map((data) => data[0])} /> {/* Pass the first column of CSV data as texts */}
              <button onClick={handleDownloadQRs}>Download QR Codes</button>
              <button onClick={() => setShowQrScreen(false)}>Go Back</button>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Upload;
