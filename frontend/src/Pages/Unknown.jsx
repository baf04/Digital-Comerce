import React from "react";
import "./CSS/Unknown.css";
import teamImage from "../Components/Assets/logo.png";

const Unknown = () => {
    return (
        <div className="notfound-container">
          <div className="notfound-content-wrapper">
            <div className="notfound-header">
              <h1>Oops!</h1>
            </div>
            <div className="notfound-content">
              <h2>Page Not Found</h2>
              <p>
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
              </p>
              <p>Please try the following:</p>
              <ul>
                <li>Check the URL for typing errors.</li>
                <li>Refresh the page or try again later.</li>
                <li>Contact your website <a href="/contact">administrator</a> if you believe this is an error.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    };


export default Unknown
