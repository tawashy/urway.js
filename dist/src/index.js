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
const urway = new URWAY({
    terminalId: "calinda",
    password: "Urway@123",
    secret: "935bf48fe601eef3e034584eb5c12c13b9c2c6ba105d052f740c2653e3179b9d",
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    // const payment = await urway.payment.create({
    //   referenceId: "119",
    //   amount: "200.00",
    //   customer: {
    //     email: "yaser.tawash@gmail.com",
    //     firstName: "Yaser",
    //     lastName: "Tawash",
    //   },
    //   redirectURL: "http://localhost:3000/callback",
    // });
    // console.log(payment);
    // const check = await urway.payment.check({
    //   paymentId: "2302118621469666298",
    //   referenceId: "119",
    //   amount: "200.00",
    //   hash: "ac2818dd10567d0d4e4882bf448676626b04c21d7677892f21de13957fc0971c",
    // });
    // console.log(check);
    // const refund = await urway.payment.refund({
    //   paymentId: "2302118621469666298",
    //   referenceId: "119",
    //   amount: "200.00",
    //   hash: "ac2818dd10567d0d4e4882bf448676626b04c21d7677892f21de13957fc0971c",
    // });
    // console.log(refund);
}))();
// {
//   hash: '1efe988a14f0004c65c689db0a957f5aa6b2311676a1d772737bb26b58f27131',
//   paymentId: '2302016612273928952',
//   url: 'https://payments-dev.urway-tech.com/URWAYPGService/direct.jsp?paymentid=2302016612273928952'
// }
// http://localhost:3000/callback?PaymentId=2301916603583144469&TranId=2301916603583144469&ECI=05&Result=Successful&TrackId=2&AuthCode=237003&ResponseCode=000&RRN=301913237003&responseHash=1da7ec025b619aab50233884ac7d3fe7a30a14fac8a4d2ebd461a8d458640ddc&cardBrand=VISA&amount=200.00&UserField1=&UserField3=&UserField4=&UserField5=&cardToken=&maskedPAN=450875XXXXXX1019&email=&payFor=&SubscriptionId=null&PaymentType=DebitCard&metaData=
// http://localhost:3000/callback?PaymentId=2302017612359091072&TranId=2302017612359091072&ECI=05&Result=Successful&TrackId=116&AuthCode=234058&ResponseCode=000&RRN=302014234058&responseHash=c7a8f301c74f60e117e881095044feddde1a148427bae4beffe94bf4313f389b&cardBrand=VISA&amount=200.00&UserField1=&UserField3=&UserField4=&UserField5=&cardToken=&maskedPAN=450875XXXXXX1019&email=&payFor=&SubscriptionId=null&PaymentType=DebitCard&metaData=