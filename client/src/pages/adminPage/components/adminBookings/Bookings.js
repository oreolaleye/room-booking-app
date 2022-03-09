import React, { useState, useEffect } from "react";
import axios from "axios";
import LargeNotification from "../../../../components/notification/LargeNotification";
import Preloader from "../../../../components/preloader/Preloader";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [prevBookings, setPrevBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState();
  const [showAllBookings, setShowAllBookings] = useState(true);
  const [showActiveBookings, setShowActiveBookings] = useState(false);
  const [showCancelledBookings, setShowCancelledBookings] = useState(false);
  const [showPrevBookings, setShowPrevBookings] = useState(false);

  const getAllBookings = async () => {
    try {
      setLoading(true);

      const data = await (await axios.get("/api/getallbookings")).data;

      setBookings(data);
      setLoading(false);

      const tempactive = data.filter((booking) => booking.status === "Booked");
      setActiveBookings(tempactive);

      const tempcancelled = data.filter(
        (booking) => booking.status === "Cancelled"
      );
      setCancelledBookings(tempcancelled);

      const tempprev = data.filter((booking) => booking.status === "Elapsed");
      setPrevBookings(tempprev);
    } catch (error) {
      setMessage({ status: "Error", message: "Oops!! Something went wrong" });
      setShowNotification(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
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

  const deleteBooking = async (bookingId) => {
    setShowNotification(false);
    setMessage({});

    await axios.delete(`/api/booking/deleteBooking/${bookingId}`).then(
      (response) => {
        setMessage({ status: "Success", message: response.data.message });
        setShowNotification(true);
      },
      (error) => {
        setMessage({
          status: "Error",
          message: "Oops!! Something went wrong.",
        });
        console.log(error);
        setShowNotification(true);
      }
    );
  };

  const closeNotification = () => {
    setShowNotification(false);
    window.location.reload();
  };

  const handleShowAllBookings = () => {
    setShowAllBookings(true);
    setShowActiveBookings(false);
    setShowCancelledBookings(false);
    setShowPrevBookings(false);
  };
  const handleShowActiveBookings = () => {
    setShowAllBookings(false);
    setShowActiveBookings(true);
    setShowCancelledBookings(false);
    setShowPrevBookings(false);
  };
  const handleShowCancelledBookings = () => {
    setShowAllBookings(false);
    setShowActiveBookings(false);
    setShowCancelledBookings(true);
    setShowPrevBookings(false);
  };
  const handleShowPrevBookings = () => {
    setShowAllBookings(false);
    setShowActiveBookings(false);
    setShowCancelledBookings(false);
    setShowPrevBookings(true);
  };

  return (
    <div>
      {loading ? <Preloader /> : null}
      {showNotification ? (
        <LargeNotification message={message} close={closeNotification} />
      ) : null}
      <div className="admin_bookings">
        <div className="scroll_div">
          <div className="booking_summary">
            {bookings.length > 0 && (
              <div
                className="booking_summary_div total"
                onClick={handleShowAllBookings}
              >
                <div className="booking_summary_img">
                  <img
                    src="https://img.icons8.com/external-becris-lineal-becris/30/ffffff/external-booking-hotel-service-becris-lineal-becris.png"
                    alt=""
                  />
                </div>
                <h2>Total Bookings</h2>
                <h1>{bookings.length}</h1>
              </div>
            )}
            {activeBookings.length > 0 && (
              <div
                className="booking_summary_div active"
                onClick={handleShowActiveBookings}
              >
                <div className="booking_summary_img">
                  <img
                    src="https://img.icons8.com/windows/30/ffffff/event-accepted.png"
                    alt=""
                  />
                </div>
                <h2>Active Bookings</h2>
                <h1>{activeBookings.length}</h1>
              </div>
            )}
            {cancelledBookings.length > 0 && (
              <div
                className="booking_summary_div cancelled"
                onClick={handleShowCancelledBookings}
              >
                <div className="booking_summary_img">
                  <img
                    src="https://img.icons8.com/windows/30/ffffff/event-declined.png"
                    alt=""
                  />
                </div>
                <h2>Cancelled Bookings</h2>
                <h1>{cancelledBookings.length}</h1>
              </div>
            )}
            {prevBookings.length > 0 && (
              <div
                className="booking_summary_div elapsed"
                onClick={handleShowPrevBookings}
              >
                <div className="booking_summary_img">
                  <img
                    src="https://img.icons8.com/windows/30/ffffff/event-accepted-tentatively.png"
                    alt=""
                  />
                </div>
                <h2>Elapsed Bookings</h2>
                <h1>{prevBookings.length}</h1>
              </div>
            )}
          </div>
        </div>
        <div>
          {showAllBookings ? (
            <AdminBookingDetails
              bookings={bookings}
              title="All Bookings"
              cancelBooking={cancelBooking}
              deleteBooking={deleteBooking}
            />
          ) : null}
          {showActiveBookings ? (
            <AdminBookingDetails
              bookings={activeBookings}
              title="ActiveBookings"
              cancelBooking={cancelBooking}
              deleteBooking={deleteBooking}
            />
          ) : null}
          {showCancelledBookings ? (
            <AdminBookingDetails
              bookings={cancelledBookings}
              title="Cancelled Bookings"
              cancelBooking={cancelBooking}
              deleteBooking={deleteBooking}
            />
          ) : null}

          {showPrevBookings ? (
            <AdminBookingDetails
              bookings={prevBookings}
              title="Elapsed Bookings"
              cancelBooking={cancelBooking}
              deleteBooking={deleteBooking}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Bookings;

export function AdminBookingDetails(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div className="scroll_div">
        <div className="admin_bookings_div">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Room</th>
                <th>Booking ID</th>
                <th>User ID</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Duration</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            {props.bookings.map((booking, index) => (
              <tbody key={booking._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{booking.room}</td>
                  <td>{booking._id}</td>
                  <td>{booking.userId}</td>
                  <td>{booking.checkInDate}</td>
                  <td>{booking.checkOutDate}</td>
                  <td>{booking.duration} nights</td>
                  <td>
                    <span>&#8358;</span>
                    {booking.totalAmount}
                  </td>
                  <td>{booking.status}</td>
                  <td>{booking.createdAt}</td>
                  <td>{booking.updatedAt}</td>
                  {booking.status === "Booked" ? (
                    <td>
                      <button
                        className="btn2"
                        onClick={() =>
                          props.cancelBooking(booking._id, booking.roomId)
                        }
                      >
                        Cancel Booking
                      </button>
                    </td>
                  ) : null}
                  {booking.status === "Cancelled" ||
                  booking.status === "Elapsed" ? (
                    <td>
                      <button
                        onClick={() => props.deleteBooking(booking._id)}
                        className="btn3"
                      >
                        Delete Booking
                      </button>
                    </td>
                  ) : null}
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
