"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const constants_1 = require("../utils/constants");
const status_codes_json_1 = __importDefault(require("../utils/status-codes.json"));
const UrWayError_1 = require("../utils/UrWayError");
const crypto_js_1 = require("crypto-js");
class Config {
    constructor(config) {
        this.ParseOptionalMetadata = (metadata) => {
            if (!metadata)
                return "";
            if (metadata.constructor === Object || metadata.constructor === Array)
                metadata = JSON.stringify(metadata);
            return metadata.replace(/"/g, "'");
        };
        this.handleError = (response) => {
            const status = response.responseCode;
            let message = "unknown error, please check urway docs for more details";
            if (status_codes_json_1.default[status])
                message = status_codes_json_1.default[status];
            throw new UrWayError_1.UrWayError({ status, message });
        };
        this.validateResponseHash = (data) => {
            const { TranId, ResponseCode, amount, hash } = data;
            const txn_details = `${TranId}|${this.secret}|${ResponseCode}|${amount}`;
            const requestHash = (0, crypto_js_1.SHA256)(txn_details).toString();
            if (requestHash !== hash)
                throw new Error("Invalid Hash");
        };
        this.terminalId = config.terminalId;
        this.password = config.password;
        this.url = config.mode === "production" ? constants_1.PRODUCTION_URL : constants_1.TESTING_URL;
        this.secret = config.secret;
    }
}
exports.Config = Config;
