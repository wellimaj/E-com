const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: String, // The user to whom the cart belongs
  created_at: { type: Date, default: Date.now }, // Timestamp when the cart was created
  updated_at: { type: Date, default: Date.now }, // Timestamp when the cart was last updated
  products: [
    // An array of cart items
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
      productId: String,
    },
  ],
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coupon",
  },
});

export const cart = mongoose.model("cart", cartSchema);
