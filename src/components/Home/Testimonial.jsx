import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "./Home.css"

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    const res = await axios.get("http://localhost:5000/api/testimonial");
    setTestimonials(res.data.data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {testimonials.map((testimonial) => (
        <div className="testimonial py-5 px-3" key={testimonial.id}>
          <div className="testimon-section">
            <p className="testi-quote">"</p>

            <p className="section__description">{testimonial.description}</p>

            <div className="mt-3 d-flex align-items-center gap-4">
              <br></br>
              <div>
                <h6 className="section__description">{testimonial.name}</h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;




