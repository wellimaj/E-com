import express, { Request, Response } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { CartService } from "../services/cart.service";
import { Coupon } from "../services/coupon.service";
export class ProtectedController {
  public path = "/cart";
  public router = express.Router();
  private AuthMiddleWare: any;
  constructor() {
    this.AuthMiddleWare = new AuthMiddleware();
    this.initRoutes();
  }
  private initRoutes() {
    this.router.use(this.AuthMiddleWare.verfiyToken);
    this.router.get("/", this.cart);
    this.router.post("/update", this.updateCart);
    this.router.post("/generateCoupon", this.generateCoupon);
    this.router.post("/checkout", this.checkout);
    this.router.post("/applyCoupon", this.applyCoupon);
  }
  async cart(req: any, res: any) {
    let cart = new CartService(req.jwtData.username);
    let result = await cart.get();
    res.status(200).send({ products: result.products }).end();
  }
  async updateCart(req: any, res: any) {
    const { products } = req.body;
    let cart = new CartService(req.jwtData.username);
    let result = await cart.addToCart(products);
    // console.log(cart.addToCart(products));
    res.status(200).send(result).end();
  }
  async generateCoupon(req: any, res: any) {
    let coupon = new Coupon(req.jwtData.username);
    let result = await coupon.generateCoupon();
    res.status(200).send(result).end();
  }
  async checkout(req: any, res: any) {
    const { products } = req.body;
    let cart = new CartService(req.jwtData.username);
    let result = await cart.checkout();
    // console.log(cart.addToCart(products));
    res.status(200).send(result).end();
  }
  async applyCoupon(req: any, res: any) {
    const { products, coupon } = req.body;
    let cart = new CartService(req.jwtData.username);
    let result = await cart.applyCoupon(coupon);
    // console.log(cart.addToCart(products));
    res.status(200).send(result).end();
  }
}
