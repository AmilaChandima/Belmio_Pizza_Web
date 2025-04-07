import express from "express";
import { createReservation } from "../controllers/reservationController.js";

const reservationRouter = express.Router();

reservationRouter.post("/", createReservation);

export default reservationRouter;
