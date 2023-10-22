import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const couponSchema = new mongoose.Schema({
  userId:String ,
  code: {
    type: String,
    default: uuidv4, 
    unique: true,
  }, 
  discount_percentage: Number, // The discount percentage (e.g., 10%)
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order", // Reference to the order to which the coupon is associated
  },
  name:String
});

export const coupon = mongoose.model("coupon", couponSchema);

