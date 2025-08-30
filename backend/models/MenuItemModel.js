import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  medium: {
    type: Number,
    required: true,
    min: [0.01, "Medium price must be a positive number"], // ✅ prevent negatives
  },
  large: {
    type: Number,
    required: true,
    min: [0.01, "Large price must be a positive number"], // ✅ prevent negatives
  },
});

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    prices: priceSchema,
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
