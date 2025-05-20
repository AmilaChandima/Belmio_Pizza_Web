// controllers/reservationController.js
import Reservation from "../models/Reservation.js"; // Adjust to correct model file if needed

export const createReservation = async (req, res) => {
  try {
    const { date, inTime, outTime, tables } = req.body;

    // Check if any of the selected tables are already reserved in the given time range
    const overlappingReservations = await Reservation.find({
      date,
      tables: { $in: tables },
      $or: [
        { inTime: { $lt: outTime }, outTime: { $gt: inTime } }
      ],
    });

    if (overlappingReservations.length > 0) {
      return res.status(409).json({
        message: "Some selected tables are already reserved for this time period.",
      });
    }

    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json({ message: "Reservation successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReservedTables = async (req, res) => {
  try {
    const { date, inTime, outTime } = req.query;

    if (!date || !inTime || !outTime) {
      return res.status(400).json({ message: "Missing date, inTime or outTime" });
    }

    const reservations = await Reservation.find({
      date,
      $or: [
        { inTime: { $lt: outTime }, outTime: { $gt: inTime } }
      ]
    });

    const reservedTables = reservations.flatMap((r) => r.tables);
    res.json({ reservedTables });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reservations" });
  }
};
=======
import Reservation from "../models/reservationModel.js";

const createReservation = async (req, res) => {
  const { tables, date, time, name, contact, headCount } = req.body;

  // Validate required fields
  if (
    !Array.isArray(tables) || tables.length === 0 ||
    !date || !time || !name || !contact || headCount == null
  ) {
    return res.status(400).json({ success: false, message: 'All fields are required, and at least one table must be selected.' });
  }
>>>>>>>>> Temporary merge branch 2

export const createReservation = async (req, res) => {
  try {
    const { date, inTime, outTime, tables } = req.body;

    // Check if any of the selected tables are already reserved in the given time range
    const overlappingReservations = await Reservation.find({
      date,
      tables: { $in: tables },
      $or: [
        { inTime: { $lt: outTime }, outTime: { $gt: inTime } }
      ],
    });

    if (overlappingReservations.length > 0) {
      return res.status(409).json({
        message: "Some selected tables are already reserved for this time period.",
      });
    }

    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json({ message: "Reservation successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

<<<<<<<<< Temporary merge branch 1
export const getReservedTables = async (req, res) => {
  try {
    const { date, inTime, outTime } = req.query;

    if (!date || !inTime || !outTime) {
      return res.status(400).json({ message: "Missing date, inTime or outTime" });
    }

    const reservations = await Reservation.find({
      date,
      $or: [
        { inTime: { $lt: outTime }, outTime: { $gt: inTime } }
      ]
    });

    const reservedTables = reservations.flatMap((r) => r.tables);
    res.json({ reservedTables });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reservations" });
  }
};
=========
export { createReservation };
>>>>>>> ab5f81a7be354c721652a9c6e4c6053fe233dd1e
>>>>>>>>> Temporary merge branch 2
