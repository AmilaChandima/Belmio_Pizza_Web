<<<<<<< HEAD
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
=======
// routes/reservationRoute.js
>>>>>>> 4cd1a64fd305406d216a5146aed2d2f20fdc1eee
import express from "express";
import {
  createReservation,
  getReservedTables,
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", getReservedTables);

<<<<<<< HEAD
export default reservationRouter;
>>>>>>> ab5f81a7be354c721652a9c6e4c6053fe233dd1e
=======
export default router;
>>>>>>> 4cd1a64fd305406d216a5146aed2d2f20fdc1eee
