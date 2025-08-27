// backend/controllers/itemController.js
const MenuItem = require("../models/MenuItem");
const mongoose = require("mongoose");

exports.getItems = async (req, res) => {
  try {
    const { category } = req.query;

    // Optional filter by category if provided and valid
    const filter = category && mongoose.Types.ObjectId.isValid(category)
      ? { category: category }
      : {};

    const items = await MenuItem.find(filter).populate("category"); // this shows category name/image too
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.addItems = async (req, res) => {
  const items = req.body;

  console.log("Received items to add:", items);

  try {
    const savedItems = await MenuItem.insertMany(items);
    res.status(201).json(savedItems);
  } catch (err) {
    console.error("Error saving items:", err);
    res.status(400).json({ error: err.message });
  }
};

// Update single item by ID
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, fullPrice, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid item ID" });
  }

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, price, fullPrice, category },
      { new: true, runValidators: true }
    ).populate("category");

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete single item by ID
exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid item ID" });
  }

  try {
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: err.message });
  }
};