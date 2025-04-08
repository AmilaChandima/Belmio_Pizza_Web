import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import reservationRouter from "./routes/reservationRoute.js";
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRouter);
app.use("/api/reservations", reservationRouter);

app.get("/", (req, res, next) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});



// mongodb+srv://kavindusarathchandraaa:<db_password>@cluster0.531tr.mongodb.net/?



