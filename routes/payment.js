const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const db = require(`../database`);
const crypto = require("crypto");
const { writeFile, readFile } = require("fs");

// Monnify Configuration
const MONNIFY_BASE_URL = "https://api.monnify.com";
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const CONTRACT_CODE = process.env.API_CONTRACT;

// Utility to get access token
const getAccessToken = async () => {
  try {
    const encoded = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
    const response = await axios.post(
      `${MONNIFY_BASE_URL}/api/v1/auth/login`,
      {},
      {
        headers: {
          Authorization: `Basic ${encoded}`,
          "Content-Type": "application/json",
        },
      },
    );

    const token = response.data.responseBody?.accessToken;
    if (!token) {
      throw new Error("Access token not found in response");
    }

    return token;
  } catch (error) {
    console.error("Access Token Error:", error.response?.data || error.message);
    throw new Error("Could not retrieve Monnify access token");
  }
};

// Just a static test route
router.get("/v1/get-opay-account", (req, res) => {
  return res.status(200).json({
    bank: "Opay",
    account: "9090124745",
    name: "Kelani Yunus Oluwadamilare",
  });
});

// 🧾 Step 1: Initialize Transaction

const paymentRef = async () => {
  const paymentRef = `ref_${crypto.randomUUID()}`;
  return paymentRef;
};

const orderIdfuntion = async () => {
  const generatedID = `ord_${crypto.randomUUID()}`;
  return generatedID;
};

router.post("/v1/init-transaction", async (req, res) => {
  const { amount, customerEmail, customerName, cart } = req.body;
  console.log(req.body, `Req body from Initialize Transaction`);

  if (!amount || !customerEmail || !customerName) {
    return res.status(400).json({ message: "Missing amount or email" });
  }

  try {
    const accessToken = await getAccessToken();
    const paymentReference = await paymentRef();

    // db.query(insertTranscDetail) for later

    // console.log(paymentReference);

    const transactionRequest = {
      amount,
      currencyCode: "NGN",
      paymentReference,
      paymentDescription: "Purchase from LinkStyle",
      customerEmail,
      contractCode: CONTRACT_CODE,
      customerName,
    };

    const response = await axios.post(
      `${MONNIFY_BASE_URL}/api/v1/merchant/transactions/init-transaction`,
      transactionRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.status(200).json({
      status: "success",
      transactionReference: response.data.responseBody.transactionReference,
      paymentReference: response.data.responseBody.paymentReference,
      checkoutUrl: response.data.responseBody.checkoutUrl,
    });
  } catch (error) {
    console.error(
      "Transaction Init Error:",
      error.response?.data || error.message,
    );
    return res
      .status(500)
      .json({ message: "Failed to initialize transaction" });
  }
});

// 🏦 Step 2: Generate Dynamic Bank Account
router.post("/generate-account", async (req, res) => {
  const { payloadCartRef } = req.body;
  console.log(`PayLoad Cart Ref :`, req.body);

  if (!payloadCartRef.transactionReference) {
    return res.status(400).json({ message: "Transaction reference required" });
  }

  try {
    const transactionReference = payloadCartRef.transactionReference;
    const customerName = payloadCartRef.customerName;
    const customerEmail = payloadCartRef.customerEmail;
    const Totalamount = payloadCartRef.amount;
    const cartGoods = JSON.stringify(payloadCartRef.CartItem);

    const shipping_address = `${payloadCartRef.streetAddress}, ${payloadCartRef.city}, ${payloadCartRef.state}, ${payloadCartRef.country}`;

    const merchant_note = payloadCartRef.deliveryNote;
    const accessToken = await getAccessToken();
    const paymentReference = await paymentRef();

    // console.log(paymentReference);
    // console.log(transactionReference);

    const OrderCartItems = payloadCartRef.CartItem;
    const dborderID = await orderIdfuntion();

    const ordersDataQuery = `insert into orders set ?`;
    const ordersData = {
      order_id: dborderID,
      customer_email: customerEmail,
      customer_name: customerName,
      total_amount: Totalamount,
      monnify_ref: transactionReference,
      payment_mode: "Account Transfer",
      shipping_address: shipping_address,
      cart: cartGoods,
    };

    db.query(ordersDataQuery, ordersData, async (err, orderData) => {
      if (err) {
        console.log(`Order data Error:`, err);
        fs.appendFile(
          "./Database_Error_Log.txt",
          `\nOrder data Error : ${err}`,
          (e) => {
            if (e) {
              console.log(`write File Error :`, e);
            }
          },
        );
        return res.status(403).json({ error: `Database internal Error` });
      } else {

        await Promise.all(
          OrderCartItems.map((item) => {
            return new Promise((resolve, reject) => {
              const dbQuery = `insert into order_items set ?`;

              const orderItemsData = {
                order_id: dborderID,
                product_id: item.productId,
                merchantPID: item.merchantPID,
                product_name: item.goodsName,
                price: item.goodsPrice,
                quantity: item.goodsQuantity,
                delivery_status: "pending",
                merchant_note,
              };

              db.query(dbQuery, orderItemsData, (err, result) => {
                if (err) {
                  console.log(`Order Items Insert Error :`, err);

                  fs.appendFile(
                    "./DataBase_Error_Log.txt",
                    `\n Order Items Insert Error : ${err}`,
                    (e) => {
                      if (e) {
                        console.log(`write File Error :`, e);
                      }
                    },
                  );

                  reject(err);
                } else {
                  resolve(result);
                }
              });
            });
          }),
        );
        console.log(`Orders Sent To Database`);
        console.log(`Order Items Sent To Database`);
      }
    });

    // db.query()

    const status = `PENDING`;
    const SqlQueryData = {
      reference_id: paymentReference,
      items: cartGoods,
      amount: Totalamount,
      monnify_ref: transactionReference,
      email: customerEmail,
      full_name: customerName,
      status: status,
      payment_mode: "Transfer",
    };
    db.query(`insert into cart set ?`, SqlQueryData, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Cart data sent and saved to database successfully`);
      }
    });

    const response = await axios.post(
      `${MONNIFY_BASE_URL}/api/v1/merchant/bank-transfer/init-payment`,
      {
        transactionReference,
        bankCode: "058",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.status(200).json({
      status: "success",
      accountNumber: response.data.responseBody.accountNumber,
      mainData: response.data.responseBody,
      // bankName: response.data.responseBody.bankName,
      // amount: response.data.responseBody.amount,
      // paymentReference: response.data.responseBody.paymentReference,
      accountName: "LinkStyles Nigeria LTD",
      customerEmail: customerEmail,
    });
  } catch (error) {
    console.error(
      "Dynamic Account Error:",
      error.response?.data || error.message,
    );
    return res
      .status(500)
      .json({ message: "Failed to generate payment account" });
  }
});

router.post(`/v1/paymentDelayUpdate/:reference?`, (req, res) => {
  console.log(req.body);
  const { reference } = req.params;
  if (req.body.status === "PENDING") {
    const FailedQuery = `update cart 
set status = 'FAILED' where monnify_ref = ?;`;

    db.query(FailedQuery, [reference], (err, FailedQueryData) => {
      if (err) {
        console.log(`Cart update with Referencing Error`, err);
      } else {
        return res.status(200).json({
          message: `Transaction Failed Please initiate a new Transaction`,
        });
      }
    });
  } else {
    return res.status(401).json({ error: `No Status Request receive` });
  }
});

module.exports = router;
