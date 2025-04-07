import express from "express";
import { createFoodTruckReservation } from "../controllers/foodTruckReservationController.js";

const foodTruckRouter = express.Router();

foodTruckRouter.post("/", createFoodTruckReservation);

export default foodTruckRouter;
