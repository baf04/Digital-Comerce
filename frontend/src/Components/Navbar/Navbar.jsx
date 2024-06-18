import React, { useContext, useState } from 'react';
import cart_logo from '../Assets/Cart_Logo.png';
import logo from '../Assets/logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems, userPoints, username } = useContext(ShopContext); 

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        window.location.replace('/');
    };

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="Cart Logo" />
                <p>Silva</p>
            </div>
            <ul className='nav-menu'>
            <li onClick={() => setMenu("about")}>
                    <Link style={{ textDecoration: 'none', color: '#551A8B' }} to='/about'>About Us</Link>
                    {menu === "about" ? <hr /> : null}
                </li>
                <li onClick={() => setMenu("shop")}>
                    <Link style={{ textDecoration: 'none', color: '#551A8B' }} to='/'>Shop</Link>
                    {menu === "shop" ? <hr /> : null}
                </li>
                <li onClick={() => setMenu("material")}>
                    <Link style={{ textDecoration: 'none', color: '#551A8B' }} to='/material'>Material</Link>
                    {menu === "material" ? <hr /> : null}
                </li>
                <li onClick={() => setMenu("consumible")}>
                    <Link style={{ textDecoration: 'none', color: '#551A8B' }} to='/consumible'>Consumable</Link>
                    {menu === "consumible" ? <hr /> : null}
                </li>
                <li onClick={() => setMenu("history")}>
                    <Link style={{ textDecoration: 'none', color: '#551A8B' }} to='/history'>Purchase History</Link>
                    {menu === "history" ? <hr /> : null}
                </li>
            </ul>

            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <>
                        <button onClick={handleLogout}>Logout from {username}</button>
                        <div className='nav-points'>{userPoints}</div> 
                    </>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'>
                    <img src={cart_logo} alt="Cart Logo" />
                </Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
