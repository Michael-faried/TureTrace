import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function QrScreen({ texts }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const handleDownload = async () => {
    const zip = new JSZip();

    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];

      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, text, { width: 256, height: 256 });

      canvas.toBlob((blob) => {
        zip.file(`${text}.png`, blob);
      });
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'qr_codes.zip');
    });
  };

  const handleNextText = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  const currentText = texts[currentTextIndex];

  return (
    <>
      <div style={{ height: 'auto', margin: '0 auto', maxWidth: 256, width: '100%' }}>
        <QRCode value={currentText} size={256} />
      </div>
      <div>
        <button onClick={handleNextText}>Next</button>
      </div>
    </>
  );
}

export default QrScreen;
