import { ConfigType } from "../types";
import { ICreatePaymentData, ICheckPaymentData, IRefundPaymentData } from "./types";
import { Config } from "../config";
export declare class Payment extends Config {
    constructor(config: ConfigType);
    /**
     * Create a new payment
     */
    create: (data: ICreatePaymentData) => Promise<{
        paymentId: any;
        hash: string;
        url: string;
    }>;
    /**
     * Check the status of a current transaction
     */
    check: (data: ICheckPaymentData) => Promise<{
        status: any;
    }>;
    refund: (data: IRefundPaymentData) => Promise<{
        status: any;
    }>;
    private creatPaymentHash;
}
