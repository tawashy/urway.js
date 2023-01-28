import type { ConfigType } from "../types";
import type { ICreatePaymentData, ICheckPaymentData, IRefundPaymentData } from "./types";
import { Config } from "../config";
export declare class Payment extends Config {
    constructor(config: ConfigType);
    /**
     * Create a new payment
     * @param data The payment data.
     * @returns  Promise<{ paymentId: string; hash: string; url: string; }>
     */
    create: (data: ICreatePaymentData) => Promise<{
        paymentId: any;
        hash: string;
        url: string;
    }>;
    /**
     * Check the status of a current transaction
     * @param data The payment data.
     * @returns  Promise<{ status: string; }>
     */
    check: (data: ICheckPaymentData) => Promise<{
        status: any;
        data: any;
    }>;
    /**
     *  Refund a payment transaction
     * @param data The payment data.
     * @returns  Promise<{ status: string; }>
     */
    refund: (data: IRefundPaymentData) => Promise<{
        status: any;
        data: any;
    }>;
    /**
     * @description Creates a hash for the payment request.
     * @param data The payment data.
     * @returns string
     */
    private creatPaymentHash;
}
