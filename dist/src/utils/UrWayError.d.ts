interface UrWayErrorInput {
    status: string;
    message: string;
}
export declare class UrWayError extends Error {
    status: string;
    constructor({ status, message }: UrWayErrorInput);
}
export {};
