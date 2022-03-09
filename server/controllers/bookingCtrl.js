const bookingModel = require("../database/models/booking_model");
const roomModel = require("../database/models/room_model");
const moment = require("moment");

createBooking = async (req, res) => {
  const {
    room,
    roomId,
    userId,
    checkInDate,
    checkOutDate,
    totalAmount,
    duration,
  } = req.body;

  try {
    const newBooking = new bookingModel({
      room,
      roomId,
      userId,
      checkInDate: moment(checkInDate).format("DD-MM-YYYY"),
      checkOutDate: moment(checkOutDate).format("DD-MM-YYYY"),
      totalAmount,
      duration,
      paymentId: "1234",
    });
    const booking = await newBooking.save();

    const roomTemp = await roomModel.findOne({ _id: roomId });

    roomTemp.currentbookings.push({
      bookingId: booking._id,
      checkIn: moment(checkInDate).format("DD-MM-YYYY"),
      checkOut: moment(checkOutDate).format("DD-MM-YYYY"),
      userId: userId,
      status: booking.status,
    });

    await roomTemp.save();

    return res.status(200).json({ message: "Room Booked Successfully!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

getBooking = async (req, res) => {
  const userId = req.body;

  try {
    const bookings = await bookingModel.find({ userid: userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json(error);
  }
};

getAllBookings = async (req, res) => {
  try {
    let today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

    const bookings = await bookingModel.find();
    bookings.forEach((booking) => {
      if (booking.checkOutDate < date) {
        booking.status = "Elapsed";
        booking.save();
      }
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json(error);
  }
};

cancelBooking = async (req, res) => {
  const { bookingId, roomId } = req.body;

  try {
    const booking = await bookingModel.findOne({ _id: bookingId });
    booking.status = "Cancelled";

    await booking.save();

    const room = await roomModel.findOne({ _id: roomId });
    const roomBookings = room.currentbookings;
    const temp = roomBookings.filter(
      (roomBooking) => roomBooking.bookingId.toString() != bookingId
    );
    room.currentbookings = temp;

    await room.save();

    res.status(200).json({ message: "Booking Cancelled" });
  } catch (error) {
    res.status(400).json(error);
  }
};
deleteBooking = async (req, res) => {
  try {
    await bookingModel.findByIdAndDelete({ _id: req.params.bookingId });
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createBooking,
  getBooking,
  cancelBooking,
  getAllBookings,
  deleteBooking,
};
