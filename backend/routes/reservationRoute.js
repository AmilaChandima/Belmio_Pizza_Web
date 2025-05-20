// routes/reservationRoute.js
import express from "express";
import {
  createReservation,
  getReservedTables,
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", getReservedTables);

export default router;