const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.createUser);
router.post("/login", userCtrl.userLogin);
router.get("/logout", userCtrl.userLogout);
router.get("/getUser", auth, userCtrl.getUser);
router.get("/getallusers", userCtrl.getAllUsers);
router.delete("/users/deleteUser/:userId", userCtrl.deleteUser);
router.post("/users/makeAdmin/:userId", userCtrl.makeUserAdmin);
router.get("/refresh_token", userCtrl.refreshToken);

module.exports = router;
