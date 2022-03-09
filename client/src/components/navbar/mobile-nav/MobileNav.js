import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../resources/logo-wh.webp";
import closeIcon from "../../../resources/close_white.svg";

function MobileNav(props) {
  return (
    <div className="mob_nav">
      <div className="mob_nav_inner">
        <img
          className="mob_nav_close"
          onClick={props.close}
          src={closeIcon}
          alt=""
        />
        <div>
          <div className="mob_nav_logo_div">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            <h5>Castel Inn</h5>
          </div>
          <div className="mob_nav_links_div">
            <ul>
              <li>
                <Link to="/hostel-rooms">Rooms</Link>
              </li>
            </ul>
          </div>
          <div className="mob_nav_btn_div">
            {props.login ? (
              <div>
                {props.userName}
                <img
                  className={
                    props.dropdown ? "dropDown_btn upsideDown" : "dropDown_btn"
                  }
                  onClick={props.handledropdown}
                  src="https://img.icons8.com/ios-glyphs/20/ffffff/chevron-down.png"
                  alt=""
                />
              </div>
            ) : (
              //
              <p>
                <Link to="/signup">Sign Up</Link> |{" "}
                <Link to="/login">Log In</Link>
              </p>
            )}
          </div>
          {props.dropdown ? (
            <div className="dropDown_mob">
              <ul>
                <li>
                  <Link to="/user/dashboard">Dashboard</Link>
                </li>

                {props.login ? (
                  <li>
                    <Link to="/admin">Admin Panel</Link>
                  </li>
                ) : null}
                <li onClick={props.logout}>Log Out</li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
