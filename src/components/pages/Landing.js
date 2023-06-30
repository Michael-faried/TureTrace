import React from "react";
import "../Card.css"; // import the stylesheet
import Background from '../Background'
import { Link } from "react-router-dom";


function Card() {
  return (
    <Background>
  <div className="card full-screen">

      <div className="button-container">
        <Link to="/user-login">
          <button>User Login</button>
        </Link>
        <Link to="/user-login">
          <button>Company Login</button>
        </Link>
        <Link to="/company-sign-up">
          <button>Company Registration</button>
        </Link>
        <Link to="/sign-up">
          <button>User Registration</button>
        </Link>
      </div>
    </div>
    </Background>
  );
}

export default Card;