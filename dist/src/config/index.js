"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const constants_1 = require("../utils/constants");
const status_codes_json_1 = __importDefault(require("../utils/status-codes.json"));
class Config {
    constructor(config) {
        this.handleError = (response) => {
            const status = response.responseCode;
            let message = "unknown error, please check urway docs for more details";
            if (status_codes_json_1.default[status])
                message = status_codes_json_1.default[status];
            console.log("RESP:", response);
            throw new Error(`error code ${status}: - ${message}`);
        };
        this.terminalId = config.terminalId;
        this.password = config.password;
        this.url = config.mode === "production" ? constants_1.PRODUCTION_URL : constants_1.TESTING_URL;
        this.secret = config.secret;
    }
}
exports.Config = Config;
