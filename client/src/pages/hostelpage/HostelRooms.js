import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import Preloader from "../../components/preloader/Preloader";
import Modal from "../../components/modal/Modal";
import "antd/dist/antd.css";
import moment from "moment";
import Room from "../../components/room/Room";
import Footer from "../../components/footer/Footer";
import DateRangePicker from "../../components/datePicker/DateRangePicker";

function HostelRooms() {
  const [rooms, setRooms] = useState([]);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [roomie, setRoomie] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkinDate, setCheckinDate] = useState();
  const [checkoutDate, setCheckoutDate] = useState();
  const [searchkey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  async function getRooms() {
    try {
      setLoading(true);
      const data = (await axios.get("http://localhost:8000/api/rooms")).data;

      setRooms(data);
      setDuplicateRooms(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const filterByDate = (dates) => {
    try {
      setCheckinDate(moment(dates[0]).format("DD-MM-YYYY"));
      setCheckoutDate(moment(dates[1]).format("DD-MM-YYYY"));

      let tempRooms = [];
      let available = false;

      for (const room of duplicateRooms) {
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.checkIn,
                booking.checkOut
              ) &&
              !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.checkIn,
                booking.checkOut
              )
            ) {
              if (
                moment(dates[0]).format("DD-MM-YYYY") !== booking.checkIn &&
                moment(dates[0]).format("DD-MM-YYYY") !== booking.checkOut &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.checkIn &&
                moment(dates[0]).format("DD-MM-YYYY") !== booking.checkOut
              ) {
                available = true;
              }
            }
          }
        }

        if (available === true || room.currentbookings.length === 0) {
          tempRooms.push(room);
        }
        setRooms(tempRooms);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterBysearchKey = () => {
    const temprooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setRooms(temprooms);
  };
  const filterByType = (e) => {
    setType(e);
    if (e !== "all") {
      const temprooms = duplicateRooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );

      setRooms(temprooms);
    } else {
      setRooms(duplicateRooms);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <div>
      {showModal ? <Modal room={roomie} close={closeModal} /> : null}
      <NavBar border />
      <DateRangePicker
        callback={filterByDate}
        searchkey={searchkey}
        setSearchKey={setSearchKey}
        search={filterBysearchKey}
        type={type}
        searchType={filterByType}
      />
      <div className="hostelPage">
        {loading ? (
          <Preloader />
        ) : (
          <div className="room_card">
            {rooms.map((room) => (
              <Room
                room={room}
                setRoomie={room}
                showDetails={setShowModal}
                roomDetails={setRoomie}
                checkIn={checkinDate}
                checkOut={checkoutDate}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default HostelRooms;
