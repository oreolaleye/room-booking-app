import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tag } from "antd";
import NavBar from "../../components/navbar/NavBar";
import Preloader from "../../components/preloader/Preloader";
import LargeNotification from "../../components/notification/LargeNotification";
import Footer from "../../components/footer/Footer";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  });

  return (
    <div>
      <NavBar />
      <div className="profile_page">
        <div className="profie_details_div">
          <p>
            <span className="boldText">Name:</span> {user.name}
          </p>
          <p>
            <span className="boldText">Email:</span> {user.email}
          </p>
        </div>
        <MyBookings />
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;

export function MyBookings() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState();
  const [showCurrent, setShowCurrent] = useState(true);
  const [showCancelled, setShowCancelled] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const getBookings = async () => {
    try {
      setLoading(true);

      const booking = await (
        await axios.post("/api/getBookingById", {
          userId: user._id,
        })
      ).data;

      setBookingDetails(booking);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line
  }, []);

  const cancelBooking = async (bookingId, roomId) => {
    try {
      setShowNotification(false);
      setMessage({});

      setLoading(true);
      await axios
        .post("/api/cancelBooking", { bookingId, roomId })
        .then((res) => {
          setMessage({ status: "Success", message: res.data.message });
          setShowNotification(true);
          setLoading(false);
        });
    } catch (error) {
      setMessage({ status: "Error", message: "Oops!! Something went wrong" });
      setShowNotification(true);
      setLoading(false);
    }
  };
  const closeNotification = () => {
    setShowNotification(false);
    window.location.reload();
  };

  const handleShowCurrent = () => {
    setShowCancelled(false);
    setShowCurrent(!showCurrent);
  };
  const handleShowCancelled = () => {
    setShowCurrent(false);
    setShowCancelled(!showCancelled);
  };
  return (
    <div>
      <div>
        {showNotification ? (
          <LargeNotification message={message} close={closeNotification} />
        ) : null}
        {loading ? (
          <Preloader />
        ) : (
          <div>
            <div>
              <div className="booking_tab">
                <h3>Current Bookings</h3>
                <div>
                  <img
                    className={
                      showCurrent ? "dropDown_btn upsideDown" : "dropDown_btn"
                    }
                    onClick={handleShowCurrent}
                    src="https://img.icons8.com/ios-glyphs/20/000000/chevron-down.png"
                    alt=""
                  />
                </div>
              </div>
              <hr />
              {showCurrent ? (
                <div className="bookingDetails">
                  {bookingDetails.map((bookingDetail) => {
                    return bookingDetail.status === "Booked" ? (
                      <BookingDetails
                        bookingDetail={bookingDetail}
                        cancelBooking={cancelBooking}
                      />
                    ) : null;
                  })}
                </div>
              ) : null}
            </div>
            <div>
              <div className="booking_tab">
                <h3>Cancelled Bookings</h3>
                <div>
                  <img
                    className={
                      showCancelled ? "dropDown_btn upsideDown" : "dropDown_btn"
                    }
                    onClick={handleShowCancelled}
                    src="https://img.icons8.com/ios-glyphs/20/000000/chevron-down.png"
                    alt=""
                  />
                </div>
              </div>
              <hr />
              {showCancelled ? (
                <div className="bookingDetails">
                  {bookingDetails.map((bookingDetail) => {
                    return bookingDetail.status === "Cancelled" ? (
                      <BookingDetails
                        bookingDetail={bookingDetail}
                        cancelBooking={cancelBooking}
                      />
                    ) : (
                      ""
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function BookingDetails({ bookingDetail, cancelBooking }) {
  return (
    <div className="bookingDetails_div" key={bookingDetail._id}>
      <h1>{bookingDetail.room}</h1>
      <p>
        <span className="boldText">Booking reference:</span> {bookingDetail._id}
      </p>
      <p>
        <span className="boldText">Check In:</span> {bookingDetail.checkInDate}
      </p>
      <p>
        <span className="boldText">Check Out:</span>{" "}
        {bookingDetail.checkOutDate}
      </p>
      <p>
        <span className="boldText">Charge:</span> <span>&#8358;</span>
        {bookingDetail.totalAmount}
      </p>
      <p>
        <span className="boldText">Status:</span>{" "}
        {bookingDetail.status === "Booked" ? (
          <Tag color="green">Confirmed</Tag>
        ) : (
          <Tag color="volcano">Cancelled</Tag>
        )}
      </p>

      {bookingDetail.status === "Cancelled" ? null : (
        <div className="cancelBooking_div">
          <button
            className="btn2"
            onClick={() => {
              cancelBooking(bookingDetail._id, bookingDetail.roomId);
            }}
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
}
