import { ConfigType } from "./types";
import { Payment } from "./payment";
export declare class URWAY {
    payment: Payment;
    private subscription;
    constructor(config: ConfigType);
}
