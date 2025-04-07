import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  tables: {
    type: [Number],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
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
  headCount: {
    type: Number,
    required: true,
  },
});

const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);
export default Reservation;
