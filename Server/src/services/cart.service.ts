import { cart } from "../Models/cart";
import { order } from "../Models/order";
import { Product } from "./products.service";
import { Coupon } from "./coupon.service";
import { coupon } from "../Models/coupon";
export class CartService {
  public userId: string = "";

  constructor(userId: string) {
    this.userId = userId;
  }

  async get() {
    try {
      //   console.log(this.userId,"this.userId");
      const userCart = await cart
        .findOne({ userId: this.userId })
        .populate("products.product");
      //   console.log(userCart.products[0].product, "this.userId");
      return userCart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addToCart(products) {
    try {
      const userCart = await cart.findOne({ userId: this.userId });
      const productClass = new Product();

      // Fetch product details for each product and create updated products
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          const productDetails = await productClass.getProduct(product.id);
          //   console.log(productDetails, "productDetails");
          return {
            productId: product.id,
            product: productDetails._id, // Use the product _id
            quantity: product.quantity,
          };
        })
      );

      if (!userCart) {
        // Create a new cart if it doesn't exist
        const newCart = new cart({ userId: this.userId });
        newCart.products = updatedProducts;
        await newCart.save();
        console.log("Cart created and products added");
        return "Cart created and products added";
      } else {
        // Update the existing cart's products
        userCart.products = updatedProducts;
        await userCart.save();
        console.log("Cart updated");
        return "Cart updated";
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkout() {
    try {
      const cartData = await cart
        .findOne({ userId: this.userId })
        .populate("products.product")
        .populate("coupon");
      //   console.log(cartData, "cartData");
      if (cartData.products && cartData.products.length > 0) {
        // const product = new Product()
        // // const products = await product.getProductswithIDs(
        // //   cartData.products.map((product) => product.id)
        // // );
        const calculateOrderTotal = (products) =>
          products.reduce((total, cartProduct) => {
            const product = cartProduct.product; // Access the product details
            const price = product.price || 0;
            const quantity = cartProduct.quantity || 0;

            return total + price * quantity;
          }, 0);
        // console.log(cartData.coupon, "cartData");
        var price = calculateOrderTotal(cartData.products);
        if (cartData.coupon) {
          price = (price * cartData.coupon.discount_percentage) / 100;
        }
        const newOrder = new order({
          items: cartData.products,
          total_price: price,
          userId: this.userId,
          status: "completed",
          coupon: cartData.coupon,
        });

        const orderdata = await newOrder.save();
        cartData.coupon.order = orderdata
        console.log(await cartData.coupon.order.save(),"coupon saved")
      }
    } catch (error) {
      throw error;
    }
  }
  async applyCoupon(name) {
    try {
      const userCart = await cart
        .findOne({ userId: this.userId })
        .populate("coupon");
      console.log(userCart.coupon, "userCart");
      const couponData = await coupon.findOne({
        userId: this.userId,
        name: name,
      });
      userCart.coupon = couponData;
      userCart.save();
    } catch (e) {
      console.log(e);
    }
  }
}
