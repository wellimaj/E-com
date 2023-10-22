// import product from 'Models/product'
const { product } = require("../Models/product");
export class Product {
  constructor() {}
  async getProducts() {
    let products = await product.find({});
    return products.map((data) => {
      const { productId, price, name } = data;
      return { productId, price, name };
    });
  }
  async getProductswithIDs(productIds) {
    let products = await product.find({ productId: { $in: productIds } });
    
    return products;
  }
  async getProduct(id){
     return await product.findOne({ productId:id });
  }
}
