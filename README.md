# urway.js

The URWAY.js library provides convenient access to the URWAY API from
applications written in server-side JavaScript.

## Installation

Install the package with:

```sh
npm install urway.js --save
# or
yarn add urway.js
```

## Usage

The package needs to be configured with your account's secret key, password, and terminal id, which are sent by urway via email when your account is created.

```js
import { URWAY } from "urway.js";

const urway = new URWAY({
  terminalId: "XXX",
  password: "XXX",
  secret: "XXX",
  // mode: 'production', // This parameter is required in production.
});

// generate a payment link wich should be sent via email or redirect your customer to it.
const payment_link = await urway.createPaymentLink({
  trackid: "UNIQUE_ORDER_ID",
  amount: "20.00",
  currency: "SAR", // or USD
  customerEmail: "example@example.com",
  country: "SA",
  redirectURL: "https://domain.com/process_payment",
});

console.log(payment_link);
// https://URWAY_DOMAIN/URWAYPGService/direct.jsp?paymentid=XXXXXXXXXXXXXXX
```
