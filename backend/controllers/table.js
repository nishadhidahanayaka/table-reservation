const Table = require("../models/Table");

const createTable = async (req, res, next) => {
  try {
    const newTable = new Table(req.body);
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTable = async (req, res, next) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedTable) return res.status(404).json("Table not found");
    res.status(200).json(updatedTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTable = async (req, res, next) => {
  try {
    const deleted = await Table.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json("Table not found");
    res.status(200).json("Table has been deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTable = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json("Table not found");
    res.status(200).json(table);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTable,
  updateTable,
  deleteTable,
  getTable,
  getTables
};
