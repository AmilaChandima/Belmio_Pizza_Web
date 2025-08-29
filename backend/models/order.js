import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        name: String,
        size: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["card", "cod"], required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
