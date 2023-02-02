import { PRODUCTION_URL, TESTING_URL } from "../utils/constants";
import { ConfigType } from "../types";
import ErrorMessages from "../utils/status-codes.json";
import { UrWayError } from "../utils/UrWayError";
import { SHA256 } from "crypto-js";

export class Config {
  protected terminalId: string;
  protected password: string;
  protected url: string;
  protected secret: string;

  constructor(config: ConfigType) {
    this.terminalId = config.terminalId;
    this.password = config.password;
    this.url = config.mode === "production" ? PRODUCTION_URL : TESTING_URL;
    this.secret = config.secret;
  }

  protected ParseOptionalMetadata = (metadata: any): string => {
    if (!metadata) return "";
    if (metadata.constructor === Object || metadata.constructor === Array)
      metadata = JSON.stringify(metadata);
    return metadata.replace(/"/g, "'");
  };

  protected handleError = (response: any) => {
    const status = response.responseCode as keyof typeof ErrorMessages;
    let message = "unknown error, please check urway docs for more details";
    if (ErrorMessages[status]) message = ErrorMessages[status];

    throw new UrWayError({ status, message });
  };

  protected validateResponseHash = (data: any) => {
    const { TranId, ResponseCode, amount, hash } = data;
    const txn_details = `${TranId}|${this.secret}|${ResponseCode}|${amount}`;
    const requestHash = SHA256(txn_details).toString();
    if (requestHash !== hash) throw new Error("Invalid Hash");
  };
}
