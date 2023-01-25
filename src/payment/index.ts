import { TransactionType } from "../types";
import type { ConfigType } from "../types";
import type {
  ICreatePaymentData,
  ICreatePaymentRequest,
  ICheckPaymentData,
  ICheckPaymentRequest,
  IRefundPaymentData,
  IRefundPaymentRequest,
} from "./types";

import { SHA256 } from "crypto-js";
import { api } from "../utils/api";
import { Config } from "../config";
import validateAmount from "../helper/validateAmount";

export class Payment extends Config {
  constructor(config: ConfigType) {
    super(config);
  }

  /**
   * Create a new payment
   * @param data The payment data.
   * @returns  Promise<{ paymentId: string; hash: string; url: string; }>
   */
  public create = async (data: ICreatePaymentData) => {
    // create a payment here ...
    const {
      redirectURL,
      referenceId,
      customer,
      lang = "EN",
      udf1,
      udf4,
    } = data;
    let { amount } = data;
    amount = validateAmount(amount);
    // create a hash for the payment
    const hash = this.creatPaymentHash({
      referenceId,
      amount,
      currency: "SAR",
    });
    // construct the payment object
    const payment: ICreatePaymentRequest = {
      trackid: referenceId,
      terminalId: this.terminalId,
      password: this.password,
      action: TransactionType.Purchase,
      merchantIp: "10.10.10.10",
      country: "SA",
      currency: "SAR",
      amount,
      requestHash: hash,
      customerEmail: customer.email,
      First_name: customer.firstName,
      Last_name: customer.lastName,
      Address: customer.address,
      City: customer.city,
      State: customer.state,
      Zip: customer.zip,
      Phoneno: customer.phone,
      udf1: this.ParseOptionalMetadata(udf1),
      udf2: redirectURL,
      udf3: lang,
      udf4: this.ParseOptionalMetadata(udf4),
    };

    // call the api endpoint to return the redirect api.
    const response = await api(this.url, payment);
    const isFailure = response.result === "Failure";

    // if there was an error throw the error
    if (isFailure) this.handleError(response);

    console.log(response);

    return {
      paymentId: response.payid,
      hash,
      url: `${response.targetUrl}?paymentid=${response.payid}`,
    };
  };

  /**
   * Check the status of a current transaction
   * @param data The payment data.
   * @returns  Promise<{ status: string; }>
   */
  public check = async (data: ICheckPaymentData) => {
    // check payment here ...
    const { paymentId, referenceId, hash } = data;
    let { amount } = data;
    amount = validateAmount(amount);

    this.validateResponseHash(data);

    const payment: ICheckPaymentRequest = {
      transid: paymentId,
      trackid: referenceId,
      terminalId: this.terminalId,
      password: this.password,
      country: "SA",
      currency: "SAR",
      action: TransactionType.Inquiry,
      amount,
      requestHash: hash,
      udf1: TransactionType.Purchase,
    };

    const response = await api(this.url, payment);
    const isUnSuccessful =
      response.result === "UnSuccessful" || response.result === "Failure";

    // handle error when un successful.
    if (isUnSuccessful) this.handleError(response);

    return {
      status: response.result,
      data: response,
    };
  };
  /**
   *  Refund a payment transaction
   * @param data The payment data.
   * @returns  Promise<{ status: string; }>
   */
  public refund = async (data: IRefundPaymentData) => {
    const { paymentId, referenceId, hash } = data;
    let { amount } = data;
    amount = validateAmount(amount);

    const payment: IRefundPaymentRequest = {
      transid: paymentId,
      trackid: referenceId,
      terminalId: this.terminalId,
      password: this.password,
      country: "SA",
      currency: "SAR",
      action: TransactionType.Refund,
      amount,
      requestHash: hash,
    };

    const response = await api(this.url, payment);
    console.log(response);
    const isUnSuccessful =
      response.result === "UnSuccessful" || response.result === "Failure";

    // handle error when un successful.
    if (isUnSuccessful) this.handleError(response);

    return {
      status: response.result,
      data: response,
    };
  };
  /**
   * @description Creates a hash for the payment request.
   * @param data The payment data.
   * @returns string
   */
  private creatPaymentHash = ({ referenceId, amount, currency }: any) => {
    const txn_details = `${referenceId}|${this.terminalId}|${this.password}|${this.secret}|${amount}|${currency}`;
    return SHA256(txn_details).toString();
  };
  /**
   * @description Validates the response hash to ensure the response is valid and not tampered with.
   * @param data The response data from the payment gateway.
   * @returns void | Error
   */
  private validateResponseHash = (data: any) => {
    const { TranId, ResponseCode, amount, hash } = data;
    const txn_details = `${TranId}|${this.secret}|${ResponseCode}|${amount}`;
    const requestHash = SHA256(txn_details).toString();
    if (requestHash !== hash) throw new Error("Invalid Hash");
  };
}
