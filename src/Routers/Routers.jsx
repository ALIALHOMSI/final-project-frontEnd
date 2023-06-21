import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ContactUs from '../components/ContactUs/ContactUs.jsx';
import Login from '../components/Login/Login.jsx';
import Home from '../components/Home/Home.jsx';
import Scroll from '../components/Home/ScrolltoTop/Scroll.jsx';
import Products from '../components/ProductsFunctionality/Products.jsx';
import Cart from '../components/cartFunctionality/cart.jsx';
import Shirt from '../components/ProductsFunctionality/ProductsTypeFilter/shirtProduct.jsx';
import Pants from '../components/ProductsFunctionality/ProductsTypeFilter/pantsProduct.jsx';
import Shoes from '../components/ProductsFunctionality/ProductsTypeFilter/shoesProduct.jsx';
import Register from '../components/Register/Register.jsx';

const Routers = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Shirt" element={<Shirt />} />
        <Route path="/pants" element={<Pants />} />
        <Route path="/Shoes" element={<Shoes />} />
      </Routes>
      <Scroll />
    </div>
  );
}

export default Routers;
