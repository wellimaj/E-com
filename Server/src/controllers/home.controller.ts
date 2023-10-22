import express, { Request, Response } from "express";
import { Product } from "../services/products.service";
export class HomeController {
  public path = "/";
  public router = express.Router();
  constructor() {
    this.initRoutes();
  }
  private initRoutes() {
    this.router.get("/", this.home);
    this.router.get("/products", this.products);
  }
  home(req: Request, res: Response) {
    res.send("success");
  }
  async products(req: Request, res: Response) {
    const products = new Product();
    let result = await products.getProducts();

    res.status(200).send({ products: result});
  }
}
