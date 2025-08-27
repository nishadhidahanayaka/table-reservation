const mongoose = require("mongoose");

const MenuCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("MenuCategory", MenuCategorySchema);
