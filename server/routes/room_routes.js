const express = require("express");
const router = express.Router();
const RoomCtrl = require("../controllers/roomCtrl");

router.post("/room/createRoom", RoomCtrl.createRoom);
router.get("/rooms", RoomCtrl.getRooms);
router.get("/room/:roomId", RoomCtrl.getRoomById);
router.get("/getallrooms", RoomCtrl.getAllRooms);
router.put("/room/updateRoom/:roomId", RoomCtrl.updateRoom);
router.delete("/room/deleteRoom/:roomId", RoomCtrl.deleteRoom);

module.exports = router;
