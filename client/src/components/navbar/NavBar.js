import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import navMenu from "../../resources/menu.svg";
import MobileNav from "./mobile-nav/MobileNav";
import axios from "axios";

function NavBar(props) {
  const [showMobNav, setShowMobNav] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const openMobNav = () => {
    setShowMobNav(true);
  };

  const closeMobNav = () => {
    setShowMobNav(false);
  };

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const userLogOut = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.clear();
      window.location.href = "/";
      setShowDropDown(false);
    } catch (error) {}
  };

  return (
    <div>
      {showMobNav ? (
        <MobileNav
          close={closeMobNav}
          dropdown={showDropDown}
          handledropdown={handleDropDown}
          logout={userLogOut}
          userName={userInfo.name}
          login={userInfo}
        />
      ) : null}
      <div className={props.bg ? "navbar bg" : "navbar border"}>
        <div className="nav_logo_div">
          <Link to="/">
            <h1>Castel Inn</h1>
            <h5>Hostels & Apartments</h5>
          </Link>
        </div>

        <div className="nav_btn_div">
          {userInfo ? (
            <div>
              {userInfo.name}
              <img
                className={
                  showDropDown ? "dropDown_btn upsideDown" : "dropDown_btn"
                }
                onClick={handleDropDown}
                src="https://img.icons8.com/ios-glyphs/20/000000/chevron-down.png"
                alt=""
              />
            </div>
          ) : (
            <p>
              <Link to="/signup">Sign Up</Link> |{" "}
              <Link to="/login">Log In</Link>
            </p>
          )}
          {showDropDown ? (
            <div className="dropDown">
              <ul>
                <li>
                  <Link to="/user/dashboard">Dashboard</Link>
                </li>

                {userInfo.isAdmin ? (
                  <li>
                    <Link to="/admin">Admin Panel</Link>
                  </li>
                ) : null}
                <li onClick={userLogOut}>Log Out</li>
              </ul>
            </div>
          ) : null}
        </div>

        <div className="nav_menu_div">
          <img onClick={openMobNav} className="nav_menu" src={navMenu} alt="" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
