"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Purchase"] = 1] = "Purchase";
    TransactionType[TransactionType["Refund"] = 2] = "Refund";
    TransactionType[TransactionType["Authorization"] = 4] = "Authorization";
    TransactionType[TransactionType["Capture"] = 5] = "Capture";
    TransactionType[TransactionType["Void"] = 9] = "Void";
    TransactionType[TransactionType["Inquiry"] = 10] = "Inquiry";
    TransactionType[TransactionType["Link"] = 15] = "Link";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
