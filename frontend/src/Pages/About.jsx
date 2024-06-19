import React from "react";
import teamImage from "../Components/Assets/Untitled design.png";
import backgroundImage from "../Components/Assets/logo.png"; 
import "./CSS/About.css";

const About = () => {

  return (
    <div className="about-container">
      <div className="about-content-wrapper">
        <div className="about-header">
          <h1>About Us</h1>
        </div>
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            Shopadvizor was created to place consumers at the heart of
            brands'. Our mission is to democratize access to transparent and
            reliable information to enhance the consumer goods industry.
          </p>
          <h2>Points Explanation</h2>
          <p>
            Our goal with the points system is to enable consumers to try
            products for free. In return, users commit to promoting and sharing
            those products that meet high-quality standards.
          </p>
          <img src={teamImage} alt="Our Team" />
          <h2>Contact Us</h2>
          <p>
            Have any questions? Feel free to <a href="/contact">contact us</a>.
            We are here to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
