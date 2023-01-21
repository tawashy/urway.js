"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URWAY = void 0;
const payment_1 = require("./payment");
const subscription_1 = require("./subscription");
class URWAY {
    constructor(config) {
        this.payment = new payment_1.Payment(config);
        this.subscription = new subscription_1.Subscription(config);
    }
}
exports.URWAY = URWAY;
