import React, { useState } from "react";
import Info_Icon from "../../resources/info.svg";
import LargeNotification from "../notification/LargeNotification";

function Room(props) {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const showError = () => {
    setMessage({
      status: "Error",
      message: "Enter Check in and Check out dates",
    });

    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const openModal = () => {
    props.showDetails(true);
  };

  const bookRoom = () => {
    if (!userInfo) {
      window.location.href = "/login";
    } else {
      window.location.href = `/bookings/${props.room._id}/${props.checkIn}/${props.checkOut}`;
    }
  };
  return (
    <div className="room_card_div" key={props.room._id}>
      {showNotification ? (
        <LargeNotification message={message} close={closeNotification} />
      ) : null}
      <div className="room_img_div">
        <div className={props.room.type === "Delux" ? "delux" : "hide"}>
          <p>{props.room.type}</p>
        </div>

        <img src={props.room.imageurls[0]} alt="" />
      </div>
      <div className="room_text_div">
        <h3>{props.room.name}</h3>
        <img
          className="room_info_btn"
          src={Info_Icon}
          alt="room info"
          onClick={() => {
            openModal();
            props.roomDetails(props.room);
          }}
        />
      </div>
      <div className="room_btn_div">
        {props.checkIn || props.checkOut ? (
          <button className="btn" onClick={bookRoom}>
            Book now for <span>&#8358;</span>
            {props.room.rentperday}/night
          </button>
        ) : (
          <button className="btn" onClick={showError}>
            Book now for <span>&#8358;</span>
            {props.room.rentperday}/night
          </button>
        )}
      </div>
    </div>
  );
}

export default Room;
