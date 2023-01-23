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
exports.Payment = void 0;
const types_1 = require("../types");
const crypto_1 = require("crypto");
const api_1 = require("../utils/api");
const config_1 = require("../config");
const validateAmount_1 = __importDefault(require("../helper/validateAmount"));
class Payment extends config_1.Config {
    constructor(config) {
        super(config);
        /**
         * Create a new payment
         */
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            // create a payment here ...
            const { redirectURL, referenceId, customer } = data;
            let { amount } = data;
            amount = (0, validateAmount_1.default)(amount);
            // create a hash for the payment
            const hash = this.creatPaymentHash({
                referenceId,
                amount,
                currency: "SAR",
            });
            // construct the payment object
            const payment = {
                trackid: referenceId,
                terminalId: this.terminalId,
                password: this.password,
                action: types_1.TransactionType.Purchase,
                merchantIp: "10.10.10.10",
                country: "SA",
                currency: "SAR",
                amount,
                requestHash: hash,
                customerEmail: customer.email,
                First_name: customer.firstName,
                Last_name: customer.lastName,
                Address: customer.address,
                City: customer.city,
                State: customer.state,
                Zip: customer.zip,
                Phoneno: customer.phone,
                udf2: redirectURL,
            };
            // call the api endpoint to return the redirect api.
            const response = yield (0, api_1.api)(this.url, payment);
            const isFailure = response.result === "Failure";
            // if there was an error throw the error
            if (isFailure)
                this.handleError(response);
            console.log(response);
            return {
                paymentId: response["payid"],
                hash,
                url: `${response["targetUrl"]}?paymentid=${response["payid"]}`,
            };
        });
        /**
         * Check the status of a current transaction
         */
        this.check = (data) => __awaiter(this, void 0, void 0, function* () {
            // check payment here ...
            const { paymentId, referenceId, hash } = data;
            let { amount } = data;
            amount = (0, validateAmount_1.default)(amount);
            const payment = {
                transid: paymentId,
                trackid: referenceId,
                terminalId: this.terminalId,
                password: this.password,
                country: "SA",
                currency: "SAR",
                action: types_1.TransactionType.Inquiry,
                amount,
                requestHash: hash,
                udf1: types_1.TransactionType.Purchase,
            };
            const response = yield (0, api_1.api)(this.url, payment);
            const isUnSuccessful = response.result === "UnSuccessful" || response.result === "Failure";
            // handle error when un successful.
            if (isUnSuccessful)
                this.handleError(response);
            return {
                status: response.result,
            };
        });
        this.refund = (data) => __awaiter(this, void 0, void 0, function* () {
            const { paymentId, referenceId, hash } = data;
            let { amount } = data;
            amount = (0, validateAmount_1.default)(amount);
            const payment = {
                transid: paymentId,
                trackid: referenceId,
                terminalId: this.terminalId,
                password: this.password,
                country: "SA",
                currency: "SAR",
                action: types_1.TransactionType.Refund,
                amount,
                requestHash: hash,
            };
            const response = yield (0, api_1.api)(this.url, payment);
            console.log(response);
            const isUnSuccessful = response.result === "UnSuccessful" || response.result === "Failure";
            // handle error when un successful.
            if (isUnSuccessful)
                this.handleError(response);
            return {
                status: response.result,
            };
        });
        this.creatPaymentHash = ({ referenceId, amount, currency }) => {
            const txn_details = `${referenceId}|${this.terminalId}|${this.password}|${this.secret}|${amount}|${currency}`;
            return (0, crypto_1.createHash)("sha256").update(txn_details).digest("hex");
        };
    }
}
exports.Payment = Payment;
