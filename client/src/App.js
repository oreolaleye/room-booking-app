import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AdminPage from "./pages/adminPage/AdminPage";
import BookingPage from "./pages/bookingspage/BookingPage";
import HomePage from "./pages/homepage/HomePage";
import HostelRooms from "./pages/hostelpage/HostelRooms";
import Login from "./pages/loginpage/Login";
import ProfilePage from "./pages/profilePage/ProfilePage";
import SignUp from "./pages/signuppage/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={HomePage} />
        <Route path="/hostel-rooms" exact component={HostelRooms} />
        <Route
          path="/bookings/:roomId/:checkIn/:checkOut"
          exact
          component={BookingPage}
        />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/user/dashboard" exact component={ProfilePage} />
        <Route path="/admin" exact component={AdminPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
