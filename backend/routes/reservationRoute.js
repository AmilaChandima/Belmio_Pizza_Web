<<<<<<< HEAD
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
=======
import express from "express";
import { createReservation } from "../controllers/reservationController.js";

const reservationRouter = express.Router();

reservationRouter.post("/", createReservation);

export default reservationRouter;
>>>>>>> ab5f81a7be354c721652a9c6e4c6053fe233dd1e
