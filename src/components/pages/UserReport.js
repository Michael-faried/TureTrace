import React, { useState } from "react";
import './UserReport.css';

const UserReport = (props) => {
  const [productDesc, setProductDesc] = useState('');
  const [productLocation, setProductLocation] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const companies = ['Company A', 'Company B', 'Company C']; // Array of companies

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const submitUpload = () => {
    // Handle form submission here
    console.log('Submitted!');
    console.log('Selected Company:', selectedCompany);
    console.log('Product Location:', productLocation);
    console.log('Product Description:', productDesc);
  };

  return (
    <div className="user-report">
      <video src='/videos/video.mp4' autoPlay loop muted />
      <div className="user-report-inner">
        <h1 style={{ color: "white"}}>Report Fake Product</h1>
        <select value={selectedCompany} onChange={handleCompanyChange} className="mySelect">
          <option value="">Select a company</option>
          {companies.map((company, index) => (
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
        <button onClick={submitUpload} className="btn" style={{ margin: "0 auto" }}>Report</button>
      </div>
    </div>
  );
};

export default UserReport;
