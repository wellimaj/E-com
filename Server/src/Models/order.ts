import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    default: uuidv4, // Generate a UUID as the default order ID
    unique: true,
  },
  userId: String,
  order_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["placed", "shipped", "canceled", "completed"],
    default: "placed",
    required: true,
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"coupon"
  },
});

export const order = mongoose.model("order", orderSchema);


