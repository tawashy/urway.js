import { TransactionType } from "../types";
export interface Customer {
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
}
type lang = "AR" | "EN";
export interface ICreatePaymentData {
    referenceId: string;
    amount: string | number;
    customer: Customer;
    redirectURL: string;
    lang?: lang;
    udf1?: string;
    udf4?: string;
}
export interface ICreatePaymentRequest {
    trackid: string;
    terminalId: string;
    password: string;
    action: TransactionType;
    merchantIp: string;
    country: "SA";
    currency: "SAR";
    amount: string | number;
    requestHash: string;
    customerEmail: string;
    First_name?: string;
    Last_name?: string;
    Address?: string;
    City?: string;
    State?: string;
    Zip?: string;
    Phoneno?: string;
    udf1?: string;
    udf2: string;
    udf3: lang;
    udf4?: string;
}
export interface ICheckPaymentData {
    paymentId: string;
    referenceId: string;
    amount: string | number;
    hash: string;
}
export interface ICheckPaymentRequest {
    transid: string;
    trackid: string;
    terminalId: string;
    country: "SA" | "USA";
    currency: "SAR";
    password: string;
    action: TransactionType.Inquiry;
    amount: string | number;
    requestHash: string;
    udf1: TransactionType;
}
export interface IRefundPaymentData {
    paymentId: string;
    referenceId: string;
    amount: string | number;
    hash: string;
}
export interface IRefundPaymentRequest {
    transid: string;
    trackid: string;
    terminalId: string;
    country: "SA" | "USA";
    currency: "SAR";
    password: string;
    action: TransactionType.Refund;
    amount: string | number;
    requestHash: string;
}
export {};
