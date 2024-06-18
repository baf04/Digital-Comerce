import React from "react";
import './Footer.css'
import instagramicon from '../Assets/instagram.png'
import xicon from '../Assets/x.png'
import facebookicon from '../Assets/facebook.png'
import youtubeicon from '../Assets/youtube.png'
import footer_logo from '../Assets/logo.png'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>Silva</p>
            </div>
            <ul className="footer-links">
                <li><a href="/unknown">Company</a></li>
                <li><a href="/consumible">Products</a></li>
                <li><a href="/unknown">Offices</a></li>
                <li><a href="/about">About Us</a></li>
                <li ><a href="/contact">Contact</a></li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagramicon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={xicon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={facebookicon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={youtubeicon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 Bruno Silva - All Rights Reserved</p>
            </div>

        </div>
    )
}

export default Footer
