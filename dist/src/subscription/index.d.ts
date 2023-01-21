import { Config } from "../config";
import { ConfigType } from "../types";
export declare class Subscription extends Config {
    constructor(config: ConfigType);
    /**
     * Create a new payment
     */
    create: () => Promise<void>;
    /**
     * Check the status of a current transaction
     */
    check: () => Promise<void>;
    /**
     * Check the status of a current transaction
     */
    cancel: () => Promise<void>;
}
