import { Config } from "../config";
import { ConfigType } from "../types";

export class Subscription extends Config {
  constructor(config: ConfigType) {
    super(config);
  }

  /**
   * Create a new payment
   */
  public create = async () => {};

  /**
   * Check the status of a current transaction
   */
  public check = async () => {};

  /**
   * Check the status of a current transaction
   */
  public cancel = async () => {};
}
