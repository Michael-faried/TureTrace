import React, { useState } from 'react';
import Papa from 'papaparse';

function CSVUploader() {
  const [csvData, setCSVData] = useState([]);

  function handleFileUpload(event) {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const dataArray = results.data.map((row) => Object.values(row));
        setCSVData(dataArray);
        // console.log(dataArray[0])
        // dataArray -> 2d array holding csv data
      },
      error: (error) => {
        console.error('Error parsing CSV file:', error);
      },
    });
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />

      {csvData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                {row.map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CSVUploader;