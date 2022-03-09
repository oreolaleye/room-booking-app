const User = require("../database/models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../middleware/auth");

createUser = async (req, res) => {
  // get user details from request body
  const {
    fname,
    lname,
    email,
    phone,
    address,
    address2,
    city,
    province,
    password,
    isAdmin,
  } = req.body;

  try {
    // check if email already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ msg: "This email already exists." });
    }

    // password encryption
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      fname,
      lname,
      email,
      phone,
      address,
      address2,
      city,
      province,
      password: passwordHash,
      isAdmin,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return user
    return res
      .status(200)
      .json({ message: "User Registered Successfully!", user });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

userLogin = async (req, res) => {
  try {
    // get login details from request body
    const { email, password } = req.body;

    // check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    // check password
    const ismatch = bcrypt.compare(password, user.password);
    console.log(ismatch);
    console.log(user.password);
    console.log(password);
    if (!ismatch) {
      return res.status(401).json({ msg: "Incorrect Password." });
    }

    res.status(200).json({
      _id: user._id,
      name: user.fname + " " + user.lname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error!!!" });
  }
};

userLogout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged Out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.userId });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

makeUserAdmin = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    user.isAdmin = !user.isAdmin;
    user.save();
    res.status(200).json({ message: "User's Admin status updated." });
  } catch (error) {
    res.status(400).json(error);
  }
};

refreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;

    if (!rf_token) {
      return res.status(400).json({ msg: "Please login or register" });
    }

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Please login or register" });
      }
      const accesstoken = createAccessToken({ id: user.id });
      res.json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
module.exports = {
  createUser,
  userLogin,
  userLogout,
  getUser,
  getAllUsers,
  deleteUser,
  makeUserAdmin,
  refreshToken,
};
