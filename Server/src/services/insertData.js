// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   productId: String,
//   price: Number,
//   name: String,
// });

// const product = mongoose.model("product", productSchema);

// const products = [
//   {
//     productId: "1",
//     price: 19.99,
//     name: "Product 1",
//   },
//   {
//     productId: "2",
//     price: 29.99,
//     name: "Product 2",
//   },
//   {
//     productId: "3",
//     price: 14.99,
//     name: "Product 3",
//   },
// ];

// mongoose.connect("mongodb://localhost/ecom", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// product.insertMany(products).then((docs) => {
//   console.log("Products inserted:", docs);
// });
