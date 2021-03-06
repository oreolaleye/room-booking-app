const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database/db_connect");
const dotenv = require("dotenv");
const roomsRoute = require("./routes/room_routes");
const userRoutes = require("./routes/user_routes");
const bookingRoutes = require("./routes/booking_routes");

app.use(express.json());
app.use(cors());
app.use("/api", roomsRoute);
app.use("/user", userRoutes);
app.use("/api", bookingRoutes);

app.use("uploads", express.static("uploads"));

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirnmae, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running at port ${port}`));
