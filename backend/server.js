const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

// Import routes
const authRoute = require("./routes/auth");
const tablesRoute = require("./routes/tables");
const usersRoute = require("./routes/users");
const reservationRoute = require("./routes/reservation");
const availabilityRoute = require("./routes/availability");
const categoryRoute = require("./routes/categoryRoutes");
const itemRoute = require("./routes/itemRoutes");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_ACCESS);
    console.log(" MongoDB connection successful");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log(" MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log(" MongoDB connected");
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());

// Static folders
app.use("/profilePictures", express.static(path.join(__dirname, "src/profilePictures")));
app.use("/menu-images", express.static(path.join(__dirname, "public/menu-images")));

// Routes
app.use("/auth", authRoute);
app.use("/tables", tablesRoute);
app.use("/users", usersRoute);
app.use("/reservations", reservationRoute);
app.use("/availability", availabilityRoute);
app.use("/api/admin/categories", categoryRoute);
app.use("/api/admin/items", itemRoute);

// Error Handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connect();
  console.log(` Server running on http://localhost:${PORT}`);
});
