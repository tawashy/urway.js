export enum TransactionType {
  Purchase = 1,
  Refund = 2,
  Authorization = 4,
  Capture = 5,
  Void = 9,
  Inquiry = 10,
  Link = 15,
}

export interface ProcessPaymentType {
  trackid: string;
  amount: string;
  currency: "SAR" | "USD";
  customerEmail: string;
  country: "SA";
  redirectURL: string;
}

export interface IPayment {
  trackid: string;
  terminalId: string;
  password: string;
  action: TransactionType;
  merchantIp: string;
  country: "SA";
  currency: "SAR" | "USD";
  amount: string;
  requestHash: string;
  customerEmail: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

export type ConfigType = {
  terminalId: string;
  password: string;
  secret: string;
  mode?: "production" | undefined;
};
