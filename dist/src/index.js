"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URWAY = void 0;
const crypto_1 = require("crypto");
const status_codes_json_1 = __importDefault(require("./status-codes.json"));
const constants_1 = require("./constants");
const api_1 = require("./api");
const types_1 = require("./types");
class URWAY {
    constructor(config) {
        this.createPaymentLink = (data) => __awaiter(this, void 0, void 0, function* () {
            const { redirectURL, trackid, amount, currency, country, customerEmail } = data;
            // create a hash for the payment
            const hash = this.creatPaymentHash({ trackid, amount, currency });
            // construct the payment object
            const payment = {
                trackid,
                terminalId: this.terminalId,
                password: this.password,
                action: types_1.TransactionType.Purchase,
                merchantIp: "10.10.10.10",
                country,
                currency,
                amount,
                requestHash: hash,
                customerEmail: customerEmail,
                udf2: redirectURL,
            };
            // call the api endpoint to return the redirect api.
            const response = yield (0, api_1.api)(this.url, payment);
            const isFailure = response.result === "Failure";
            // if there was an error throw the error
            if (isFailure) {
                const status = response.responseCode;
                let message = "unknown error, please check urway docs for more details";
                if (status_codes_json_1.default[status])
                    message = status_codes_json_1.default[status];
                throw new Error(`error code ${status}: - ${message}`);
            }
            // else return the redirect url
            return `${response["targetUrl"]}?paymentid=${response["payid"]}`;
        });
        // creates a payment hash string.
        this.creatPaymentHash = ({ trackid, amount, currency }) => {
            const txn_details = `${trackid}|${this.terminalId}|${this.password}|${this.secret}|${amount}|${currency}`;
            return (0, crypto_1.createHash)("sha256").update(txn_details).digest("hex");
        };
        this.terminalId = config.terminalId;
        this.password = config.password;
        this.url = config.mode === "production" ? constants_1.PRODUCTION_URL : constants_1.TESTING_URL;
        this.secret = config.secret;
    }
}
exports.URWAY = URWAY;
