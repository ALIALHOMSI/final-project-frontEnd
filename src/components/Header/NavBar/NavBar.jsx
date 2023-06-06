import React from "react";
import './NavBar.css';
import LogoutButton from '../../Auth/Logout.jsx';
import {  Link } from "react-router-dom";

function NavBar() {
  return (
<>
<div id="menu_wrapper" class="menu_wrapper">
  <ul class="menu_list">
    <li class="list" name="item">
      <Link to="/" class="home">Home</Link>

    </li>
    <li class="list" name="item">
      <Link to="/AboutUs" >About Us</Link>

    </li>
   
    <li class="list" name="item">
    <Link to="/ContactUs" name="single" >Contact Us</Link>
    </li>
    <li class="list" name="item">
    <Link to="/products" name="single" >products</Link>
    </li>
    <li class="list" name="item">
    <Link to="/cart" name="single" >cart</Link>
    </li>
    
    <li class="list" name="item">
    <Link to="/Login"  name="single" >Login</Link>
      
    </li>
    <li className="list" name="item">
            <LogoutButton /> {/* Include the LogoutButton component here */}
          </li>
  </ul>
</div>
</>  
    )
}

export default NavBar;

