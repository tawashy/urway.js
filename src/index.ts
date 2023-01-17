import { createHash } from "crypto";

import ErrorMessages from "./status-codes.json";
import { PRODUCTION_URL, TESTING_URL } from "./constants";
import { api } from "./api";
import {
  ConfigType,
  IPayment,
  ProcessPaymentType,
  TransactionType,
} from "./types";

export class URWAY {
  private terminalId: string;
  private password: string;
  private url: string;
  private secret: string;

  constructor(config: ConfigType) {
    this.terminalId = config.terminalId;
    this.password = config.password;
    this.url = config.mode === "production" ? PRODUCTION_URL : TESTING_URL;
    this.secret = config.secret;
  }

  public createPaymentLink = async (data: ProcessPaymentType) => {
    const { redirectURL, trackid, amount, currency, country, customerEmail } =
      data;

    // create a hash for the payment
    const hash = this.creatPaymentHash({ trackid, amount, currency });
    // construct the payment object
    const payment: IPayment = {
      trackid,
      terminalId: this.terminalId,
      password: this.password,
      action: TransactionType.Purchase,
      merchantIp: "10.10.10.10",
      country,
      currency,
      amount,
      requestHash: hash,
      customerEmail: customerEmail,
      udf2: redirectURL,
    };

    // call the api endpoint to return the redirect api.
    const response = await api(this.url, payment);
    const isFailure = response.result === "Failure";

    // if there was an error throw the error
    if (isFailure) {
      const status = response.responseCode as keyof typeof ErrorMessages;
      let message = "unknown error, please check urway docs for more details";
      if (ErrorMessages[status]) message = ErrorMessages[status];

      throw new Error(`error code ${status}: - ${message}`);
    }

    // else return the redirect url
    return `${response["targetUrl"]}?paymentid=${response["payid"]}`;
  };

  // creates a payment hash string.
  private creatPaymentHash = ({ trackid, amount, currency }: any) => {
    const txn_details = `${trackid}|${this.terminalId}|${this.password}|${this.secret}|${amount}|${currency}`;
    return createHash("sha256").update(txn_details).digest("hex");
  };
}
