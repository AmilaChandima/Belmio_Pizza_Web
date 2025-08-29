import FoodTruckReservation from "../models/foodTruckReservationModel.js";
import { sendAdminNotification } from "../utils/smsHelper.js";

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
    
    // Send SMS notification
    const message = `New Food Truck Booking!\nName: ${name}\nDate: ${new Date(date).toLocaleDateString()}\nContact: ${contact}\nLocation: ${location}`;
    await sendAdminNotification(message);
    
    res.status(201).json({ success: true, reservation: savedReservation });
  } catch (error) {
    console.error("Reservation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create reservation",
      error: error.message,
    });
  }
};

const getFoodTruckReservations = async (req, res) => {
  try {
    const reservations = await FoodTruckReservation.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reservations",
      error: error.message,
    });
  }
};

export { createFoodTruckReservation, getFoodTruckReservations };
