const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tables",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {  // ✅ updated to match frontend
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Optional, based on login
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model("reservations", reservationSchema);
