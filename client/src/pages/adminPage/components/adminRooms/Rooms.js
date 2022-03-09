import React, { useState, useEffect } from "react";
import axios from "axios";
import RoomForm from "../roomForm/RoomForm";
import Preloader from "../../../../components/preloader/Preloader";
import LargeNotification from "../../../../components/notification/LargeNotification";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [deluxRooms, setDeluxRooms] = useState([]);
  const [nonDeluxRooms, setNonDeluxRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState();
  const [showAllRooms, setShowAllRooms] = useState(true);
  const [showDeluxRooms, setShowDeluxRooms] = useState(false);
  const [showNonDeluxRooms, setShowNonDeluxRooms] = useState(false);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [openUpdateRoom, setOpenUpdateRoom] = useState({
    status: false,
    id: null,
    room: null,
  });

  const getAllRooms = async () => {
    try {
      setLoading(true);

      const data = await (await axios.get("/api/getallrooms")).data;

      setRooms(data);

      const tempdelux = data.filter((room) => room.type === "Delux");
      setDeluxRooms(tempdelux);

      const tempnondelux = data.filter((room) => room.type === "Non-Delux");
      setNonDeluxRooms(tempnondelux);

      setLoading(false);
    } catch (error) {
      setMessage({ status: "Error", message: "Oops!! Something went wrong" });
      setShowNotification(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const closeNotification = () => {
    setShowNotification(false);
  };

  const handleShowAllRooms = () => {
    setShowAllRooms(true);
    setShowDeluxRooms(false);
    setShowNonDeluxRooms(false);
  };

  const handleShowDeluxRooms = () => {
    setShowAllRooms(false);
    setShowDeluxRooms(true);
    setShowNonDeluxRooms(false);
  };

  const handleShowNonDeluxRooms = () => {
    setShowAllRooms(false);
    setShowDeluxRooms(false);
    setShowNonDeluxRooms(true);
  };

  const handleOpenAddRoom = () => {
    setOpenAddRoom(true);
  };

  const handleOpenUpdateRoom = (roomid, room) => {
    setOpenUpdateRoom({ status: true, id: roomid, room: room });
  };
  const closeRoomModal = () => {
    setOpenAddRoom(false);
    setOpenUpdateRoom(false);
  };

  const submitAddRoomForm = async (room) => {
    setShowNotification(false);
    setMessage({});

    await axios.post("/api/room/createRoom", room).then(
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
    closeRoomModal();
  };

  const submitUpdateRoomForm = async (room) => {
    setShowNotification(false);
    setMessage({});

    await axios.put(`/api/room/updateRoom/${openUpdateRoom.id}`, room).then(
      (response) => {
        setMessage({ status: "Success", message: response.data.message });
        setShowNotification(true);
      },
      (error) => {
        setMessage({
          status: "Error",
          message: "Validation error: invalid entry",
        });
        console.log(error);
        setShowNotification(true);
      }
    );
    closeRoomModal();
  };

  const deleteRoom = async (roomid) => {
    setShowNotification(false);
    setMessage({});

    await axios.delete(`/api/room/deleteRoom/${roomid}`).then(
      (response) => {
        setMessage({ status: "Success", message: response.data.message });
        setShowNotification(true);
      },
      (error) => {
        setMessage({
          status: "Error",
          message: "Something went wrong",
        });
        console.log(error);
        setShowNotification(true);
      }
    );
  };

  return (
    <div>
      {loading ? <Preloader /> : null}

      {showNotification ? (
        <LargeNotification message={message} close={closeNotification} />
      ) : null}

      {openAddRoom ? (
        <RoomForm
          title="Create Room"
          close={closeRoomModal}
          submitForm={submitAddRoomForm}
        />
      ) : null}

      {openUpdateRoom.status ? (
        <RoomForm
          title="Update Room"
          close={closeRoomModal}
          submitForm={submitUpdateRoomForm}
          room={openUpdateRoom.room}
        />
      ) : null}

      <div className="add_room_btn_div">
        <button className="btn2" onClick={handleOpenAddRoom}>
          Add Room
        </button>
      </div>

      <div className="admin_bookings">
        <div className="scroll_div">
          <div className="booking_summary">
            {rooms.length && (
              <div
                className="booking_summary_div total"
                onClick={handleShowAllRooms}
              >
                <div className="booking_summary_img">
                  <img
                    src="https://img.icons8.com/ios/30/ffffff/bedroom.png"
                    alt=""
                  />
                </div>
                <h2>All Rooms</h2>
                <h1>{rooms.length}</h1>
              </div>
            )}

            {deluxRooms.length && (
              <div
                className="booking_summary_div active"
                onClick={handleShowDeluxRooms}
              >
                <div className="booking_summary_img">
                  <img
                    src="https://img.icons8.com/ios/30/ffffff/bedroom-interior.png"
                    alt=""
                  />
                </div>
                <h2>Delux Rooms</h2>
                <h1>{deluxRooms.length}</h1>
              </div>
            )}

            {nonDeluxRooms.length && (
              <div
                className="booking_summary_div elapsed"
                onClick={handleShowNonDeluxRooms}
              >
                <div className="booking_summary_img">
                  <img
                    src="https://img.icons8.com/ios/30/ffffff/single-bed.png"
                    alt=""
                  />
                </div>
                <h2>Non-Delux Rooms</h2>
                <h1>{nonDeluxRooms.length}</h1>
              </div>
            )}
          </div>
        </div>
        <div>
          {showAllRooms ? (
            <AdminRoomsDetails
              rooms={rooms}
              title="All Rooms"
              update={handleOpenUpdateRoom}
              delete={deleteRoom}
            />
          ) : null}
          {showDeluxRooms ? (
            <AdminRoomsDetails
              rooms={deluxRooms}
              title="Delux Rooms"
              update={handleOpenUpdateRoom}
              delete={deleteRoom}
            />
          ) : null}
          {showNonDeluxRooms ? (
            <AdminRoomsDetails
              rooms={nonDeluxRooms}
              title="Non-Delux Rooms"
              update={handleOpenUpdateRoom}
              delete={deleteRoom}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Rooms;

export function AdminRoomsDetails(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div className="scroll_div">
        <div className="admin_bookings_div">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Room ID</th>
                <th>Type</th>
                <th>Rate</th>
                <th>Description</th>
                <th>Updated At</th>
              </tr>
            </thead>
            {props.rooms.map((room, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{room.name}</td>
                  <td>{room._id}</td>
                  <td>{room.type}</td>
                  <td>
                    <span>&#8358;</span>
                    {room.rentperday}
                  </td>
                  <td>{room.description}</td>
                  <td>{room.updatedAt}</td>
                  <td>
                    <button
                      className="btn2"
                      onClick={() => props.update(room._id, room)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn3"
                      onClick={() => props.delete(room._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
