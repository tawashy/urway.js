"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var axios_1 = __importDefault(require("axios"));
var api = function (url, data) {
    return axios_1.default
        .post("".concat(url, "/URWAYPGService/transaction/jsonProcess/JSONrequest"), data)
        .then(function (response) { return response.data; });
};
exports.api = api;
