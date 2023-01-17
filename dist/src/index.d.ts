import { ConfigType, ProcessPaymentType } from "./types";
export declare class URWAY {
    private terminalId;
    private password;
    private url;
    private secret;
    constructor(config: ConfigType);
    createPaymentLink: (data: ProcessPaymentType) => Promise<string>;
    private creatPaymentHash;
}
