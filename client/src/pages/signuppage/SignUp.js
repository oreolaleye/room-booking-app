import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../../resources/logo-wh.webp";
import Notification from "../../components/notification/Notification";
import SignUpForm from "./SignUpForm";

function SignUp() {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState();

  const submitForm = async (user) => {
    setShowNotification(false);
    setMessage({});

    await axios.post("http://localhost:8000/user/register", user).then(
      (response) => {
        setMessage({ status: "Success", message: response.data.message });
        setShowNotification(true);
      },
      (error) => {
        setMessage({
          status: "Error",
          message: "Validation error: invalid entry",
        });
        setShowNotification(true);
      }
    );
  };
  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="form_div">
      <div className="form_header">
        <Link to="/">
          <img src={Logo} alt="" />
          <h5 className="boldText">Castel Inn</h5>
        </Link>
      </div>
      {showNotification ? (
        <Notification message={message} close={closeNotification} />
      ) : null}
      <SignUpForm
        message={setMessage}
        notify={setShowNotification}
        title
        btnText="Sign Up"
        submit={submitForm}
        formWidth="formWidth-50"
      />
    </div>
  );
}

export default SignUp;
