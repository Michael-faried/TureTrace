import React, { useEffect } from "react";
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Landing from './components/pages/Landing';
import UserLoggedIn from './components/pages/UserLoggedIn';
import Qrscreen from './components/pages/Qrscreen';
import Upload from './components/pages/Upload';
import CompanySignUp from './components/pages/CompanySignUp';
import Login from './components/pages/Login';
import CompanyLogin from './components/pages/CompanyLogin';
import CSVUploader from './components/pages/UploadCSV';
import UserReport from './components/pages/UserReport';
import { init } from "./web3Client";
import ReportedProducts from "./components/pages/ReportedProducts";


function App() {
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/landing' element={<Landing/>} />
          <Route path='/loggedin' element={<UserLoggedIn/>} />
          <Route path='/qrscreen' element={<Qrscreen/>} />
          <Route path='/upload' element={<Upload/>} />
          <Route path='/user-login' element={<Login/>} />
          <Route path='/company-login' element={<CompanyLogin/>} />
          <Route path='/company-sign-up' element={<CompanySignUp/>} />
          <Route path='/uploadcsv' element={<CSVUploader/>} />
          <Route path='/userreport' element={<UserReport/>} />
          <Route path='/reported-products' element={<ReportedProducts/>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
