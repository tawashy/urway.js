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
export interface ICreatePaymentData {
    referenceId: string;
    amount: string;
    customer: Customer;
    redirectURL: string;
}
export interface ICreatePaymentRequest {
    trackid: string;
    terminalId: string;
    password: string;
    action: TransactionType;
    merchantIp: string;
    country: "SA";
    currency: "SAR";
    amount: string;
    requestHash: string;
    customerEmail: string;
    First_name?: string;
    Last_name?: string;
    Address?: string;
    City?: string;
    State?: string;
    Zip?: string;
    Phoneno?: string;
    udf2: string;
}
export interface ICheckPaymentData {
    paymentId: string;
    referenceId: string;
    amount: string;
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
    amount: string;
    requestHash: string;
    udf1: TransactionType;
}
export interface IRefundPaymentData {
    paymentId: string;
    referenceId: string;
    amount: string;
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
    amount: string;
    requestHash: string;
}
