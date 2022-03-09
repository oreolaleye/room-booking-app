import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../../resources/logo-wh.webp";
import Preloader from "../../components/preloader/Preloader";
import Notification from "../../components/notification/Notification";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      setShowNotification(false);

      const res = await axios.post("/user/login", user);
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="form_div">
      <div className="form_header">
        <Link to="/">
          <img src={Logo} alt="" />
          <h5>Castel Inn</h5>
        </Link>
      </div>
      {loading ? <Preloader /> : null}
      {showNotification ? (
        <Notification message={message} close={closeNotification} />
      ) : null}
      <form className="formWidth-50">
        <h2>Log In</h2>
        <div className="form_input_div">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form_input_div">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="show_password">
          <label>Show Password</label>
          <input type="checkbox" onClick={handleShowPassword} />
        </div>
        <div>
          <input className="btn" type="submit" value="Log In" onClick={login} />
        </div>
        <div className="form_input_div">
          <p>
            Don't have an account? <a href="/signup">Sign up now!</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
