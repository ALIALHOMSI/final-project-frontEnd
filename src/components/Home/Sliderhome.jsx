import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./Sliderhome.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <>
      <Slider {...settings} className="hero__slider">
        <div className="slider__item slider__item-01 mt0">
          <Container>
            <div className="slider__content ">
              <h1 className="text-light mb-3">N°1 Shopping Website in the World</h1>

              <h2 className="text-light mb-4">
                Discover Our Vast Collection of Clothes from the Comforts of your Home.
              </h2>

              <button className="seemore-btn btn reserve__btn mt-4">
                <Link to="/products">See More</Link>
              </button>
            </div>
          </Container>
        </div>

        <div className="slider__item slider__item-02 mt0">
          <Container>
            <div className="slider__content ">
              <h1 className="text-light mb-3">N°1 Shopping Website in the World</h1>

              <h2 className="text-light mb-4">
              Discover Our Vast Collection of Clothes from the Comforts of your Home.
              </h2>

              <button className="seemore-btn btn reserve__btn mt-4">
                <Link to="/products">See More</Link>
              </button>
            </div>
          </Container>
        </div>

        <div className="slider__item slider__item-03 mt0">
          <Container>
            <div className="slider__content ">
              <h1 className="text-light mb-3">N°1 Shopping Website in the World</h1>

              <h2 className="text-light mb-4">
              Discover Our Vast Collection of Clothes from the Comforts of your Home.
              </h2>

              <button className=" seemore-btn btn reserve__btn mt-4">
                <Link to="/products">See More</Link>
              </button>
            </div>
          </Container>
          
        </div>

        <div className="slider__item slider__item-04 mt0">
          <Container>
            <div className="slider__content ">
              <h1 className="text-light mb-3">N°1 Shopping Website in the World</h1>

              <h2 className="text-light mb-4">
              Discover Our Vast Collection of Clothes from the Comforts of your Home.
              </h2>

              <button className="seemore-btn btn reserve__btn mt-4">
                <Link to="/products">See More</Link>
              </button>
            </div>
          </Container>
        </div>
        
      </Slider>
    </>
  );
};

export default HeroSlider;
