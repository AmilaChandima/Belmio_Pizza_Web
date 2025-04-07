import mongoose from "mongoose";

const foodTruckReservationSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const FoodTruckReservation = mongoose.model("FoodTruckReservation", foodTruckReservationSchema);
export default FoodTruckReservation;