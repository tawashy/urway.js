import { ConfigType } from "../types";
export declare class Config {
    protected terminalId: string;
    protected password: string;
    protected url: string;
    protected secret: string;
    constructor(config: ConfigType);
    protected ParseOptionalMetadata: (metadata: any) => string;
    protected handleError: (response: any) => never;
    protected validateResponseHash: (data: any) => void;
}
