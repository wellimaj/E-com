import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true },
  price: Number,
  name: String,
});

export const product = mongoose.model("product", productSchema);
