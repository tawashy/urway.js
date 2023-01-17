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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URWAY = void 0;
var crypto_1 = require("crypto");
var status_codes_json_1 = __importDefault(require("./status-codes.json"));
var constants_1 = require("./constants");
var api_1 = require("./api");
var types_1 = require("./types");
var URWAY = /** @class */ (function () {
    function URWAY(config) {
        var _this = this;
        this.createPaymentLink = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var redirectURL, trackid, amount, currency, country, customerEmail, hash, payment, response, isFailure, status, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        redirectURL = data.redirectURL, trackid = data.trackid, amount = data.amount, currency = data.currency, country = data.country, customerEmail = data.customerEmail;
                        hash = this.creatPaymentHash({ trackid: trackid, amount: amount, currency: currency });
                        payment = {
                            trackid: trackid,
                            terminalId: this.terminalId,
                            password: this.password,
                            action: types_1.TransactionType.Purchase,
                            merchantIp: "10.10.10.10",
                            country: country,
                            currency: currency,
                            amount: amount,
                            requestHash: hash,
                            customerEmail: customerEmail,
                            udf2: redirectURL,
                        };
                        return [4 /*yield*/, (0, api_1.api)(this.url, payment)];
                    case 1:
                        response = _a.sent();
                        isFailure = response.result === "Failure";
                        // if there was an error throw the error
                        if (isFailure) {
                            status = response.responseCode;
                            message = "unknown error, please check urway docs for more details";
                            if (status_codes_json_1.default[status])
                                message = status_codes_json_1.default[status];
                            throw new Error("error code ".concat(status, ": - ").concat(message));
                        }
                        // else return the redirect url
                        return [2 /*return*/, "".concat(response["targetUrl"], "?paymentid=").concat(response["payid"])];
                }
            });
        }); };
        // creates a payment hash string.
        this.creatPaymentHash = function (_a) {
            var trackid = _a.trackid, amount = _a.amount, currency = _a.currency;
            var txn_details = "".concat(trackid, "|").concat(_this.terminalId, "|").concat(_this.password, "|").concat(_this.secret, "|").concat(amount, "|").concat(currency);
            return (0, crypto_1.createHash)("sha256").update(txn_details).digest("hex");
        };
        this.terminalId = config.terminalId;
        this.password = config.password;
        this.url = config.mode === "production" ? constants_1.PRODUCTION_URL : constants_1.TESTING_URL;
        this.secret = config.secret;
    }
    return URWAY;
}());
exports.URWAY = URWAY;
