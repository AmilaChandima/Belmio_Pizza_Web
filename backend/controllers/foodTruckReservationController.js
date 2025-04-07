import FoodTruckReservation from "../models/foodTruckReservationModel.js";

const createFoodTruckReservation = async (req, res) => {
  const { date, name, contact, location } = req.body;

  if (!date || !name || !contact || !location) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: date, name, contact, and location.",
    });
  }

  try {
    const newReservation = new FoodTruckReservation({
      date,
      name,
      contact,
      location,
    });

    const savedReservation = await newReservation.save();
    res.status(201).json({ success: true, reservation: savedReservation });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create reservation",
      error: error.message,
    });
  }
};

export { createFoodTruckReservation };
