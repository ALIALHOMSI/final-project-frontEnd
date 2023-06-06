import Pay from "../Home/images/Pay.png";
import drive from "../Home/images/drive.png";
import choose from "../Home/images/choose.png";
import "./Home.css";

function HowItWorks() {
  return (
    <div className="howItworks-All">
      <div className="howItworks-allimgs">
        <div className="howItworks-title">
          <h1>Shop From Anywhere Around The World</h1>
          <p>Only One Click Away From The Latest Fashion and Trends</p>
        </div>
        <div className="howItworks-secondsection">
          <div className="howItworksthird-img">
            <img className="howItworks-icon" src={choose}></img>
            <h3>Choose The Car You Likesddsd</h3>
            <i>
              Make a reservation to come and check the car you like at your
              preferred time.hello
            </i>
          </div>
          <div className="howItworksthird-img home-2ndpic">
            <img className="howItworks-icon " src={Pay}></img>
            <h3>Pay In Cash</h3>
            <i>Pay the amount agreed on in dollars.</i>
          </div>
          <div className="howItworksthird-img">
            <img className="howItworks-icon" src={drive}></img>
            <h3>Enjoy Your New Car</h3>
            <i>Get your car and enjoy your freedom.</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
