# THIS IS AN UNCERTIFIED BRANCH OF URWAY.JS
## DO NOT USE IN PRODUCTION

# urway.js

The URWAY.js library provides convenient access to the URWAY API from
applications written in server-side JavaScript.

DESCLAIMER: THIS LIBRARY IS UNDER DEVELOPMENT.

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
```

Note: the mode parameter will simply switch between the Production and Testing URLS.

### Create a payment

You can create a payment using the following:

```js
const payment = new urway.payment.create({
  referenceId: "ORDER_ID", // trackid, in urway docs
  amount: "200.00",
  customer: {
    email: "johenDoe@example.com", // * Required field
    // firstName: "Johen",         // Optional field
    // lastName: "Doe",            // Optional field
    // address: "",                // Optional field
    // city: "",                   // Optional field
    // state: "",                  // Optional field
    // Zip: "",                    // Optional field
    // Phoneno: "",                // Optional field
  },
  // To determine the language of the payment page, you can use the following values: EN, AR (default is EN)
  lang: "EN", // Optional field
  // A parameter for you to keep any information corresponding to the transaction.
  udf1: "", // Optional field
  udf4: "", // Optional field
  // where your customer is going to be redirected after paying.
  redirectURL: "http://localhost:3000/callback",
});
```

When the payment created successfully, you will get the following response.

```js
{
  paymentId: '2302118621469666298',
  hash: 'ac2818dd10567d0d4e4882bf448676626b04c21d7677892f21de13957fc0971c',
  url: 'https://URWAY_URL/URWAYPGService/direct.jsp?paymentid=2302118621469666298'
}
```

You have to save the paymentId and hash, you will need them later.

For the url parameter, you can redirect your customer to it so they can finish the payment.

### Customer payment flow:

1. customer should receiver, or redirected to the payment url.
2. customer should pay the amount using the preferred payment method.
3. when the payment is completed, urway system will redirect your customer to the 'redirectURL' you provided when you created the payment.
4. In your redirect URL, you chould check the payment status and update it in your system.

### Check payment status

You can check the status of a payment using the following:

```js
const check = await urway.payment.check({
  paymentId: "2302118621469666298",
  referenceId: "ORDER_ID",
  amount: "200.00",
  hash: "ac2818dd10567d0d4e4882bf448676626b04c21d7677892f21de13957fc0971c",
});
```

this should return the following:

```js
{
  status: "PENDING", // Initiated, or  Successful
  data: response // response object includes urway actual response data   
}
```

### Refund payment

You can fully or parially refund a payment by simply providing the needed refund amount.
You can use the following:

```js
const refund = await urway.payment.refund({
  paymentId: "2302118621469666298",
  referenceId: "119",
  amount: "100.00",
  hash: "ac2818dd10567d0d4e4882bf448676626b04c21d7677892f21de13957fc0971c",
});
```

This should return the following:

```js
{
  status: "Successful",
  data: response // response object includes urway actual response data   
}
```
