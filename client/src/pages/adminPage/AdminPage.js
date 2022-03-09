import React, { useEffect } from "react";
import { Tabs } from "antd";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/footer/Footer";
import Rooms from "./components/adminRooms/Rooms";
import Users from "./components/adminUsers/Users";
import Bookings from "./components/adminBookings/Bookings";
const { TabPane } = Tabs;

function AdminPage() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInfo")).isAdmin) {
      window.location.href = "/";
    }
  });

  return (
    <div>
      <NavBar />
      <div className="adminPage">
        <h1>Admin Panel</h1>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Bookings" key="1">
            <Bookings />
          </TabPane>
          <TabPane tab="Rooms" key="2">
            <Rooms />
          </TabPane>
          <TabPane tab="Users" key="3">
            <Users />
          </TabPane>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
