// controllers/reservationController.js
import Reservation from "../models/Reservation.js";

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
