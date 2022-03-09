const roomModel = require("../database/models/room_model");

createRoom = async (req, res) => {
  const newRoom = req.body;

  try {
    const room = await new roomModel(newRoom);
    room.save();
    res.status(200).json({ message: "Room created successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

getRooms = async (req, res) => {
  try {
    const rooms = await roomModel.find({});
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

getRoomById = async (req, res) => {
  try {
    const room = await roomModel.findById(req.params.roomId);
    return res.status(200).json(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

getAllRooms = async (req, res) => {
  try {
    const rooms = await roomModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json(error);
  }
};
updateRoom = async (req, res) => {
  try {
    const room = await roomModel.findOneAndUpdate(
      { _id: req.params.roomId },
      req.body
    );
    room.save();

    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};
deleteRoom = async (req, res) => {
  try {
    await roomModel.findByIdAndDelete({ _id: req.params.roomId });
    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
