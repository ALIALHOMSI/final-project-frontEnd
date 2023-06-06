import { Link } from "react-router-dom";
import tshirtlogo from "../Home/images/tshirts.jpg";
import shoeslogo from "../Home/images/shoes.jpeg";
import pantslogo from "../Home/images/pants.jpeg";


import "./Home.css";
import Testimonial from "./Testimonial";
import HeroSlider from "./Sliderhome";
import Landingpage from "./video";


function Home() {
  return (
    <div>
      <div>
        <HeroSlider />
      </div>
      <div className="home-stickyImage"></div>
    
        <div className="home-imagecollectionwithtitles">
          <div className="home-collectionwithtitles">
            <h1>MultiBrands Shopping</h1>
            <i>Best Solution For Your Needs</i>
          </div>

          <div className="home-imagecollection">
   
            <div className="container-home">
              <img className="home-audi" src={tshirtlogo} alt="shirt"></img>
              <div className="overlay">
                <h1>T-Shirt</h1>
                <br></br>
                <button className="button-overlay">
                  <Link to="/shirt">View Our Collection</Link>
                </button>
              </div>
            </div>

            <div className="container-home">
              <img className="home-audi" src={pantslogo} alt="pants"></img>
              <div className="overlay">
                <h1>Pants</h1>
                <br></br>
                <button className="button-overlay">
                  <Link to="/pants">View Our Collection</Link>
                </button>
              </div>
            </div>
        

            <div className="container-home">
              <img className="home-audi" src={shoeslogo} alt="BMW"></img>
              <div className="overlay">
                <h1>Shoes</h1>
                <br></br>
                <button className="button-overlay">
                  <Link to="shoes">View Our Collection</Link>
                </button>
              </div>
            </div>

           
          </div>
        </div>
     
      <div className="landingpage-vid">
        <Landingpage />
        
      </div>
      <div className="footer-lina-parrallax"></div>

      <div className="all-testimonials">
        <div className="testimonials">
          <div className="testi-title-p">
            <h2 className="testimonial-title">Why Clients Love Us</h2>
            <p className="testimonials-p">
              Many clients are thrilled by the service we deliver and are happy
              to tell us. Read about what some have said about us here.
            </p>
          </div>

          <div className="testi">
            <Testimonial />
            
          </div>
          
        </div>
      </div>

    </div>
  );
}

export default Home;
