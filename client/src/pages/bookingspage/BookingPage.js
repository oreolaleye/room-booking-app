import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import Preloader from "../../components/preloader/Preloader";
import moment from "moment";
import LargeNotification from "../../components/notification/LargeNotification";

function BookingPage(props) {
  const [room, setRoom] = useState(null);
  const [totalAmount, setTotalAmount] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState();
  const [userDetails, setUserDetails] = useState();
  const checkInDate = moment(props.match.params.checkIn, "DD-MM-YYYY");
  const checkOutDate = moment(props.match.params.checkOut, "DD-MM-YYYY");
  const duration = moment.duration(checkOutDate.diff(checkInDate)).asDays();

  const getRoomDetails = async () => {
    try {
      setUserDetails(JSON.parse(localStorage.getItem("userInfo")));

      const res = await fetch(`/api/room/${props.match.params.roomId}`);
      res.json().then((res) => {
        setRoom(res);
        setTotalAmount(res.rentperday * duration);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomDetails();

    // eslint-disable-next-line
  }, []);

  const bookRoom = async () => {
    const bookingDetails = {
      room: room.name,
      roomId: room._id,
      userId: userDetails._id,
      checkInDate,
      checkOutDate,
      totalAmount,
      duration,
    };

    await axios
      .post("http://localhost:8000/api/book-room", bookingDetails)
      .then(
        (res) => {
          setMessage({ status: "Success", message: res.data.message });
          setShowNotification(true);
        },
        (error) => {
          console.log(error);
          setMessage({
            status: "Error",
            message: "Oops!! Something went wrong",
          });
          setShowNotification(true);
        }
      );
  };

  const closeNotification = () => {
    setShowNotification(false);
    window.location.href = "/hostel-rooms";
  };
  return (
    <div className="booking_page">
      {showNotification ? (
        <LargeNotification message={message} close={closeNotification} />
      ) : null}
      <NavBar black />
      {room !== null ? (
        <div className="booking_div">
          <h1 className="boldText">{room.name}</h1>
          <div className="booking_date_div">
            <h3>
              <span className="boldText">Check In:</span>{" "}
              {props.match.params.checkIn}{" "}
            </h3>{" "}
            <h3>
              <span className="boldText">Check Out:</span>{" "}
              {props.match.params.checkOut}
            </h3>
            <h3 className="boldText">{duration} Nights</h3>
          </div>
          <div className="booking_details">
            <div className="details_text-div">
              <h1>Payment and Guest Details</h1>
              <hr />
              <div>
                <p>Guest Name</p>
                <p>{userDetails.name}</p>
              </div>
              <div>
                <p>Guest Email</p>
                <p>{userDetails.email}</p>
              </div>
              <div>
                <p>Room type</p>
                <p>{room.type}</p>
              </div>
              <div>
                <p>Length of stay</p>
                <p>{duration} nights</p>
              </div>
              <div>
                <p>Rate per night</p>
                <p>
                  <span>&#8358;</span>
                  {room.rentperday}
                </p>
              </div>

              <div>
                <h3 className="boldText">Total charge</h3>
                <p className="boldText">
                  <span>&#8358;</span>
                  {totalAmount}
                </p>
              </div>
              <div className="">
                <button className="btn" onClick={bookRoom}>
                  Book Now
                </button>
              </div>
            </div>
            <div className="details_img_div">
              <img src={room.imageurls[0]} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </div>
  );
}

export default BookingPage;
