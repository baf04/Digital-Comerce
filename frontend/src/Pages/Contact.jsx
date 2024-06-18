import React from "react";
import "./CSS/Contact.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const handleSendMessage = () => {
    toast.success('Email Sent, please wait for your response');
    setTimeout(() => {
        window.location.reload();
    }, 3000);     
  };

  return (
    <div className="contact-container">
      <div className="contact-content-wrapper">
        <div className="contact-header">
          <h1>Contact Us</h1>
        </div>
        <div className="contact-content">
          <h2>Get in Touch</h2>
          <p>
            Have any questions or concerns? Feel free to reach out to us through the form below. We're here to help!
          </p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="button" onClick={handleSendMessage}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
