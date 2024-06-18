import React, { useEffect, useState } from 'react';
import NavBar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ShopCategory from './Pages/ShopCategory'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import Shop from './Pages/Shop'
import LoginSingUp from './Pages/LoginSingUp'
import Footer from './Components/Footer/Footer';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Unknown from './Pages/Unknown';
import PurchaseHistory from './Pages/PurchaseHistory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/consumible' element={<ShopCategory category="consumible"/>}/>
          <Route path='/material' element={<ShopCategory category="material"/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/unknown' element={<Unknown/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/history' element={<PurchaseHistory/>}/>
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />}/>
          </Route>
          <Route path='/login' element={<LoginSingUp/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
