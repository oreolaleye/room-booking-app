import React from "react";
import BackgroundSlider from "react-background-slider";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import Gym from "../../resources/apartment_1.jpeg";
import Cafe from "../../resources/main_bg3.jpeg";
import Parking from "../../resources/main_bg4.webp";

function HomePage() {
  const images = [Gym, Cafe, Parking];
  return (
    <div>
      <NavBar bg />
      <div className="homePage">
        <BackgroundSlider images={images} duration={10} transition={2} />
        <div className="home_text">
          <h3>Castel Inn</h3>
          <h5>.....your comfort, home away from home</h5>
        </div>
        <div className="home_btn_div">
          <Link to="/hostel-rooms">
            <button className="btn">Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
