import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ContactUs from '../components/ContactUs/ContactUs.jsx';
import Home from '../components/Home/Home.jsx';
import Scroll from '../components/Home/ScrolltoTop/Scroll.jsx';
import Products from '../components/ProductsFunctionality/Products.jsx';
import Cart from '../components/cartFunctionality/cart.jsx';
import Shirt from '../components/ProductsFunctionality/ProductsTypeFilter/shirtProduct.jsx';
import Pants from '../components/ProductsFunctionality/ProductsTypeFilter/pantsProduct.jsx';
import Shoes from '../components/ProductsFunctionality/ProductsTypeFilter/shoesProduct.jsx';
import Logout from '../components/Auth/Logout.jsx';
const Routers = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Shirt" element={<Shirt />} />
        <Route path="/pants" element={<Pants />} />
        <Route path="/Shoes" element={<Shoes />} />
        <Route path="/LogOut" element={<Logout />} />
      </Routes>
      <Scroll />
    </div>
  );
}

export default Routers;
