import React, { useState } from "react";
import { init, get_companies_names, send_report } from '../../web3Client';
import './UserReport.css';
import { useNavigate } from 'react-router-dom';

const UserReport = (props) => {
  const [productDesc, setProductDesc] = useState('');
  const [productLocation, setProductLocation] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companiesArray, setCompaniesArray] = useState([]);

  const navigate = useNavigate();

  function fetchData(callback) {
    get_companies_names()
      .then((res) => {
        setCompaniesArray(res); // Update the state with the data
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }

  fetchData();

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const submitUpload = () => {
    if (productLocation.trim() === '' || productDesc.trim() === '' || selectedCompany === '') {
      alert('Please fill in all the fields');
      return;
    }
    
    // Handle form submission here
    console.log('Submitted!');
    // console.log('Selected Company:', selectedCompany);
    // console.log('Product Location:', productLocation);
    // console.log('Product Description:', productDesc);
    send_report(productLocation, productDesc, selectedCompany);
    navigate('/loggedin');
  };
  

  const goBack = () => {
    navigate(-1); // Navigate back to the previous screen
  };

  return (
    <div className="user-report">
      <video src='/videos/video.mp4' autoPlay loop muted />
      <div className="user-report-inner">
        <h1 style={{ color: "white" }}>Report Fake Product</h1>
        <select value={selectedCompany} onChange={handleCompanyChange} className="mySelect">
          <option value="">Select a company</option>
          {companiesArray.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))}
        </select>
        <textarea
          onChange={(event) => { setProductLocation(event.target.value) }}
          className="myText"
          placeholder="Enter purchase location"
          style={{ height: "80px" }}
        ></textarea>
        <textarea
          onChange={(event) => { setProductDesc(event.target.value) }}
          className="myText"
          placeholder="Enter product description"
          style={{ height: "150px" }}
        ></textarea>
        <div className="button-container">
          <button onClick={submitUpload} className="user-report-btn">Report</button>
          <button onClick={goBack} className="user-report-btn">Back</button>
        </div>
      </div>
    </div>
  );
};

export default UserReport;
