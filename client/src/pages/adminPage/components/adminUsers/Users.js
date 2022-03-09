import React, { useState, useEffect } from "react";
import axios from "axios";
import LargeNotification from "../../../../components/notification/LargeNotification";
import Preloader from "../../../../components/preloader/Preloader";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState();

  const getAllUsers = async () => {
    try {
      setLoading(true);

      const data = await (
        await axios.get("http://localhost:8000/user/getallusers")
      ).data;

      setUsers(data);
      setLoading(false);
    } catch (error) {
      setMessage({ status: "Error", message: "Oops!! Something went wrong" });
      setShowNotification(true);
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setShowNotification(false);
      setMessage({});
      setLoading(true);

      const data = await (
        await axios.delete(
          `http://localhost:8000/api/users/deleteUser/${userId}`
        )
      ).data;
      setMessage({ status: "Success", message: data.message });
      setShowNotification(true);
      setLoading(false);
    } catch (error) {
      setMessage({ status: "Error", message: "Oops!! Something went wrong" });
      setShowNotification(true);
      setLoading(false);
    }
  };

  const setUserAsAdmin = async (userId) => {
    setShowNotification(false);
    setMessage({});
    setLoading(true);

    await axios
      .post(`http://localhost:8000/api/users/makeadmin/${userId}`)
      .then(
        (response) => {
          setMessage({ status: "Success", message: response.data.message });
          setShowNotification(true);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setMessage({
            status: "Error",
            message: "Oops!! Something went wrong",
          });
          setShowNotification(true);
          setLoading(false);
        }
      );
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const closeNotification = () => {
    setShowNotification(false);
    window.location.reload();
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
            {users.length && (
              <div className="booking_summary_div total">
                <div className="booking_summary_img">
                  <img
                    src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/30/ffffff/external-users-cv-resume-flatart-icons-outline-flatarticons.png"
                    alt=""
                  />
                </div>
                <h2>All Users</h2>
                <h1>{users.length}</h1>
              </div>
            )}
          </div>
        </div>
        <div>
          <AdminUsersDetails
            users={users}
            title="All Users"
            delete={deleteUser}
            setAdmin={setUserAsAdmin}
          />
        </div>
      </div>
    </div>
  );
}

export default Users;

export function AdminUsersDetails(props) {
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
                <th>User ID</th>
                <th>email</th>
                <th>Phone No</th>
                <th>Address</th>
                <th>Admin Status</th>
              </tr>
            </thead>
            {props.users.map((user, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {user.fname} {user.lname}
                  </td>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.address}, {user.address2}, {user.city},{" "}
                    {user.province}
                  </td>
                  <td>{user.isAdmin === false ? "No" : "Yes"}</td>
                  <td>
                    <button
                      onClick={() => props.setAdmin(user._id)}
                      className="btn2"
                    >
                      {!user.isAdmin ? "Set as Admin" : "Remove as Admin"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => props.delete(user._id)}
                      className="btn3"
                    >
                      Delete User
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
