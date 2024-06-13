import React from "react";
import './Navbar.css'
import nav_logo from '../../Assets/logo.png'
const Navbar = () =>{
  return(
    <div className="navbar">
        <img src={nav_logo} alt='' className="logo-img"/>
    </div>
  )
}

export default Navbar