import { PRODUCTION_URL, TESTING_URL } from "../utils/constants";
import { ConfigType } from "../types";
import ErrorMessages from "../utils/status-codes.json";

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

  protected handleError = (response: any) => {
    const status = response.responseCode as keyof typeof ErrorMessages;
    let message = "unknown error, please check urway docs for more details";
    if (ErrorMessages[status]) message = ErrorMessages[status];
    console.log("RESP:", response);
    throw new Error(`error code ${status}: - ${message}`);
  };
}
