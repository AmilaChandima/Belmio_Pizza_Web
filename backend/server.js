import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
<<<<<<< HEAD
import reservationRouter from "./routes/reservationRoute.js";
import 'dotenv/config';

const app = express();
const port = 3000;
=======
import menuRoutes from "./routes/menuRoutes.js"; // Correctly included menuRoutes import
import reviewRouter from "./routes/reviewRouter.js";
import reservationRouter from "./routes/reservationRoute.js";
import foodTruckRouter from "./routes/foodTruckReservationRoute.js";
import "dotenv/config";

// App config
const app = express();
const port = process.env.PORT || 4000;
>>>>>>> ab5f81a7be354c721652a9c6e4c6053fe233dd1e

app.use(express.json());
app.use(cors());

connectDB();

<<<<<<< HEAD
app.use("/api/user", userRouter);
app.use("/api/reservations", reservationRouter);

app.get("/", (req, res, next) => {
=======
// Routes
app.use("/api/user", userRouter);
app.use("/api/menu", menuRoutes); // Correctly set up menu routes
app.use("/api/reviews", reviewRouter); // Correct path for reviews
app.use("/api/reservations", reservationRouter); // Add the new reservation route
app.use("/api/foodtruck-reservations", foodTruckRouter); // Food truck reservation route

app.get("/", (req, res) => {
>>>>>>> ab5f81a7be354c721652a9c6e4c6053fe233dd1e
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
<<<<<<< HEAD



// mongodb+srv://kavindusarathchandraaa:<db_password>@cluster0.531tr.mongodb.net/?



=======
>>>>>>> ab5f81a7be354c721652a9c6e4c6053fe233dd1e
