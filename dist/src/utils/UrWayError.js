"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrWayError = void 0;
class UrWayError extends Error {
    constructor({ status, message }) {
        super();
        this.status = status;
        this.message = message;
    }
}
exports.UrWayError = UrWayError;
