import React from "react";
import './Sidebar.css'
import addicon from '../../Assets/add.png'
import listicon from '../../Assets/list.png'
import { Link } from "react-router-dom";

const Sidebar = () =>{
  return(
    <div className="sidebar">
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={addicon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={listicon} alt="" />
                <p>List Products</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar