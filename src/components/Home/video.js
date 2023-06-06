import React from "react";
// import "./landingpage.css";

import "./video.css"
import BgVideo from "../Home/images/video.mp4";

const Landingpage = () => {
  return (
    <div className="landingpage">
      <video src={BgVideo} autoPlay muted loop class="video-bg" />
      <div className="bg-overlay"></div>

      <div className="home-text">
        <div className="home-imageFooter">
          <h1>Shopify</h1>
          <h2 className="home-resons">Shop From Anywhere Around The World</h2>
          <div className="home-allimgs">
            <div className="homesecondsection">
              
            
              <div className="homethird-img">
                <h2>Only One Click Away From The Latest Fashion and Trends</h2>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
