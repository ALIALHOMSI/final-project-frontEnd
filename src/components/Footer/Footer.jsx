import React from "react";
import fb from './images/Circled_Facebook_svg-512.webp'
import instagram from './images/instagram.png'
import './Footer.css'
function Footer() {
  return(<div className="footer">
    <div className="footer-2">
    <a href=""><img src={fb} alt="" /></a>
    <a href=""><img src={instagram} alt="" /></a>
    </div>
    <p>© 2023 ROADCAR. ALL RIGHTS RESERVED CREATED BY MLALH</p> 
  </div>);
}

export default Footer;
