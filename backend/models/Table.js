const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    required: true,
    enum: ["Inside", "Outside"]
  }
});

const Table = mongoose.model("tables", tableSchema);
module.exports = Table;