const express = require("express");
const router = express.Router();
const bookingCtrl = require("../controllers/bookingCtrl");

router.post("/book-room", bookingCtrl.createBooking);
router.post("/getBookingById", bookingCtrl.getBooking);
router.post("/cancelBooking", bookingCtrl.cancelBooking);
router.get("/getallbookings", bookingCtrl.getAllBookings);
router.delete("/booking/deleteBooking/:bookingId", bookingCtrl.deleteBooking);

module.exports = router;
