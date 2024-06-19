import React, { useContext, useState } from 'react';
import './Hero.css'
import heroImg from '../Assets/Hero_Img.png'
import { Link } from 'react-router-dom';

const Hero = () => {

    const [menu,setMenu] = useState("shop");

    return (
        <div className="hero">
            <div className="hero-left">
                <div>
                    <p>New</p>
                    <p>Promotions</p> 
                    <p>Available</p>
                </div>
                <div className="hero-latest-btn">
                    <p onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none', color: '#ffffff'}} to='/material'>New Promotions</Link>{menu==="shop"?<hr/>:<></>}</p>
                </div>
            </div>
            <div className="hero-right">
                <img src={heroImg} alt=""></img>
            </div>
        </div>
    )
}

export default Hero
