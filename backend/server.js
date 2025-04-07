import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import Reservation from "./models/reservations.js";
import FoodTruckReservation from "./models/foodTruckReservations.js";




// App config

const app = express();
const port = 4000;

// Middleware

app.use(express.json());
app.use(cors());


// Db connection

connectDB();
app.use("/api/user",userRouter);

app.get("/", (req,res, next) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});




// mongodb+srv://kavindusarathchandraaa:<db_password>@cluster0.531tr.mongodb.net/?


// add the new reservation

app.post('/reservations', async (req, res) => {
  const { tables, date, time, name, contact, headCount } = req.body;

  // Validate required fields
  if (
    !Array.isArray(tables) || tables.length === 0 ||
    !date || !time || !name || !contact || headCount == null
  ) {
    return res.status(400).json({ message: 'All fields are required, and at least one table must be selected.' });
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
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reservation', error: error.message });
  }
});


// food truck reservation

app.post("/foodtruck-reservations", async (req, res) => {
  const { date, name, contact, location } = req.body;

  // Check if all required fields are present
  if (!date || !name || !contact || !location) {
    return res.status(400).json({ message: "All fields are required: date, name, contact, and location." });
  }

  try {
    const newReservation = new FoodTruckReservation({
      date,
      name,
      contact,
      location,
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ message: "Failed to create reservation", error: error.message });
  }
});