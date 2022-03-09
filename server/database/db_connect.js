const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_CONNECT } = process.env;

mongoose
  .connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
