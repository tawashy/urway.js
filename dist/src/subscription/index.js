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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const config_1 = require("../config");
class Subscription extends config_1.Config {
    constructor(config) {
        super(config);
        /**
         * Create a new payment
         */
        this.create = () => __awaiter(this, void 0, void 0, function* () { });
        /**
         * Check the status of a current transaction
         */
        this.check = () => __awaiter(this, void 0, void 0, function* () { });
        /**
         * Check the status of a current transaction
         */
        this.cancel = () => __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Subscription = Subscription;
