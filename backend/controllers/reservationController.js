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

  try {
    const newReservation = new Reservation({
      tables,
      date,
      time,
      name,
      contact,
      headCount,
    });

    const savedReservation = await newReservation.save();
    res.status(201).json({ success: true, reservation: savedReservation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create reservation', error: error.message });
  }
};

export { createReservation };
