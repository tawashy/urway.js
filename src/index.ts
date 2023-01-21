import { ConfigType } from "./types";
import { Payment } from "./payment";
import { Subscription } from "./subscription";

export class URWAY {
  payment: Payment;
  private subscription: Subscription;

  constructor(config: ConfigType) {
    this.payment = new Payment(config);
    this.subscription = new Subscription(config);
  }
}
