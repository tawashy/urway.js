import { Config } from "../config";
import { ConfigType } from "../types";
import { api } from "../utils/api";
import { WeekDays } from "./constants";
import {
  ICreateSubscription,
  ICreateSubscriptionData,
  TPaymentDays,
} from "./types";

export class Subscription extends Config {
  constructor(config: ConfigType) {
    super(config);
  }

  /**
   * TODO: Create a new payment
   * @param data The payment data.
   *
   */
  public create = async (data: ICreateSubscriptionData) => {
    const {
      referenceId,
      customer,
      paymentCycle,
      paymentDays,
      subscriptionType,
      noOfRecurringPayments,
      paymentStartDate,
    } = data;
    let { amount } = data;
    // validate amount
    amount = this.CastAmount(amount);

    // create a hash for the payment
    const hash = this.creatPaymentHash({
      referenceId,
      amount,
      currency: "SAR",
    });

    // validate payment cycle with payment days
    this.validatePaymentCycle(paymentCycle, paymentDays);

    const subscription: ICreateSubscription = {
      trackid: referenceId,
      terminalId: this.terminalId,
      password: this.password,
      action: 1,
      merchantIp: "10.10.10.227",
      country: "SA",
      currency: "SAR",
      amount,
      requestHash: hash,
      paymentType: "R",
      subscriptionType,
      paymentCycle,
      paymentDays,
      noOfRecurringPayments,
      paymentStartDate,
      customerName: `${customer.firstName} ${customer.lastName}`,
      customerEmail: customer.email,
      First_name: customer.firstName,
      Last_name: customer.lastName,
      Address: customer.address,
      City: customer.city,
      State: customer.state,
      zip: customer.zip,
      phoneno: customer.phone,
      udf1: this.ParseOptionalMetadata(data.udf1),
      udf2: this.ParseOptionalMetadata(data.udf2),
      udf3: this.ParseOptionalMetadata(data.udf3),
      udf4: this.ParseOptionalMetadata(data.udf4),
      udf5: this.ParseOptionalMetadata(data.udf5),
    };

    const response = await api(this.url, subscription);
  };

  /**
   * Check the status of a current transaction
   */
  public check = async () => {};

  /**
   * Check the status of a current transaction
   */
  public cancel = async () => {};

  /**
   * validate PaymentCycle with PaymentDays
   */
  private validatePaymentCycle = (cycle: string, day: TPaymentDays) => {
    const string_day = String(day);

    const Valid =
      {
        W: WeekDays.includes(string_day as typeof WeekDays[number]),
        M: +string_day >= 1 && +string_day <= 31,
      }[cycle] || false;

    if (!Valid && cycle === "W")
      throw new Error("Day must be be a day name of the week (e.g. Sunday)");
    if (!Valid && cycle === "M")
      throw new Error("Day must be a number between 1 and 31");
  };
}
