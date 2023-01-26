import { days, PaymentCycle, WeekDays } from "./constants";

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

export type TPaymentDays = typeof WeekDays[number] | typeof days[number];
export type TPaymentCycle = typeof PaymentCycle[number];

interface ISubscriptionShared {
  paymentCycle: typeof PaymentCycle[number];
  paymentDays: TPaymentDays;
  subscriptionType: "S" | "I";
  noOfRecurringPayments: number;
  paymentStartDate: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

export interface ICreateSubscriptionData extends ISubscriptionShared {
  referenceId: string;
  amount: string | number;
  customer: Customer;
}

export interface ICreateSubscription extends ISubscriptionShared {
  trackid: string;
  terminalId: string;
  password: string;
  action: 1;
  merchantIp: string;
  country: string;
  currency: string;
  amount: number | string;
  requestHash: string;
  paymentType: "R";
  customerName?: string;
  customerEmail: string;
  First_name?: string;
  Last_name?: string;
  Address?: string;
  City?: string;
  State?: string;
  zip?: string;
  phoneno?: string;
}
