const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

const createReservation = async (req, res, next) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();

    // Set table isAvailable = false
    await Table.findByIdAndUpdate(req.body.tableId, {
      $set: { isAvailable: false },
    });

    res.status(200).json(savedReservation);
  } catch (err) {
    console.error("❌ Reservation creation failed:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("Reservation has been deleted");
  } catch (err) {
    next(err);
  }
};

const getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReservation,
  updateReservation,
  deleteReservation,
  getReservation,
  getReservations,
};