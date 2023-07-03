import React, { useState } from "react";
import { init,get_companies_names, send_report} from '../../web3Client';
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
    // Handle form submission here
    console.log('Submitted!');
    // console.log('Selected Company:', selectedCompany);
    // console.log('Product Location:', productLocation);
    // console.log('Product Description:', productDesc);
    send_report(productLocation,productDesc,selectedCompany);
    navigate('/loggedin');
  };

  return (
    <div className="user-report">
      <video src='/videos/video.mp4' autoPlay loop muted />
      <div className="user-report-inner">
        <h1 style={{ color: "white"}}>Report Fake Product</h1>
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
        <button onClick={submitUpload} className="user-report-btn" style={{ margin: "0 auto" }}>Report</button>
      </div>
    </div>
  );
};

export default UserReport;
