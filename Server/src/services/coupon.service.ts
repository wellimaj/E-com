import { order } from "../Models/order";
import { coupon } from "../Models/coupon";
export class Coupon {
  public userId = "";
  public n = 2; //define orders
  constructor(userId: string) {
    this.userId = userId;
  }
  async generateCoupon() {
    let orders = await order.countDocuments({
      userId: this.userId,
    });
    if (orders % this.n == 0) {
      const newCoupon = new coupon({
        userId: this.userId,
        discount_percentage: 10,
        name: "SAVE10",
      });
      return await newCoupon.save()
    }else{
        return `you need ${this.n % orders} orders to get a coupon`;
    }
  }
}
