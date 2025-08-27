// models/MenuItem.js
const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  fullPrice: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuCategory", // make sure this matches your Category model name
    required: true,
  },
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
