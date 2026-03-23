const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();
const db = require(`../database`)
const crypto = require('crypto');

// Monnify Configuration
const MONNIFY_BASE_URL = 'https://api.monnify.com';
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const CONTRACT_CODE = process.env.API_CONTRACT;



// Utility to get access token
const getAccessToken = async () => {
  try {
    const encoded = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
    const response = await axios.post(
      `${MONNIFY_BASE_URL}/api/v1/auth/login`,
      {},
      {
        headers: {
          Authorization: `Basic ${encoded}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const token = response.data.responseBody?.accessToken;
    if (!token) {
      throw new Error('Access token not found in response');
    }

    return token;
  } catch (error) {
    console.error('Access Token Error:', error.response?.data || error.message);
    throw new Error('Could not retrieve Monnify access token');
  }
};

// 👕 Just a static test route
router.get('/v1/get-opay-account', (req, res) => {
  return res.status(200).json({
    bank: 'Opay',
    account: '9090124745',
    name: 'Kelani Yunus Oluwadamilare'
  });
});

// 🧾 Step 1: Initialize Transaction

const paymentRef = async () => {
  const paymentRef = `ref_${crypto.randomUUID()}`;
  return paymentRef

}

router.post('/v1/init-transaction', async (req, res) => {

  const { amount, customerEmail, customerName, cart } = req.body;
  console.log(req.body, `Req body from Initialize Transaction`);

  if (!amount || !customerEmail || !customerName) {
    return res.status(400).json({ message: 'Missing amount or email' });
  }

  try {
    const accessToken = await getAccessToken();
    const paymentReference = await paymentRef()

    // db.query(insertTranscDetail) for later

    // console.log(paymentReference);


    const transactionRequest = {
      amount,
      currencyCode: 'NGN',
      paymentReference,
      paymentDescription: 'Purchase from LinkStyle',
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
      }
    );

    return res.status(200).json({
      status: 'success',
      transactionReference: response.data.responseBody.transactionReference,
      paymentReference: response.data.responseBody.paymentReference,
      checkoutUrl: response.data.responseBody.checkoutUrl,

    });

  } catch (error) {
    console.error('Transaction Init Error:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to initialize transaction' });
  }
});

// 🏦 Step 2: Generate Dynamic Bank Account
router.post('/generate-account', async (req, res) => {
  const { payloadCartRef } = req.body;
  console.log(req.body, `Req body From generated account`);

  if (!req.body.transactionReference) {
    return res.status(400).json({ message: 'Transaction reference required' });
  }

  try {
    const transactionReference = req.body.transactionReference
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const Totalamount = req.body.amount;
    const cartGoods = JSON.stringify(req.body.CartItem)
    const accessToken = await getAccessToken();
    const paymentReference = await paymentRef()
    console.log(paymentReference);
    console.log(transactionReference);



    // db can go here
    // console.log(`Db data that will be sent out`, customerEmail, customerName, cartGoods, transactionReference, paymentReference, Totalamount);

    const status = `PENDING`
    const SqlQueryData = {
      reference_id: paymentReference,
      items: cartGoods,
      amount: Totalamount,
      monnify_ref: transactionReference,
      email: customerEmail,
      full_name: customerName,
      status: status,
      payment_mode : 'Transfer'
    }
    db.query(`insert into cart set ?`, SqlQueryData, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Cart data sent and saved to database successfully`);

      }
    })

    const response = await axios.post(
      `${MONNIFY_BASE_URL}/api/v1/merchant/bank-transfer/init-payment`,
      {
        transactionReference,
        bankCode: '058',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.status(200).json({
      status: 'success',
      accountNumber: response.data.responseBody.accountNumber,
      mainData: response.data.responseBody,
      // bankName: response.data.responseBody.bankName,
      // amount: response.data.responseBody.amount,
      // paymentReference: response.data.responseBody.paymentReference,
      accountName: 'LinkStyles Nigeria LTD',
      customerEmail: customerEmail
    });

  } catch (error) {
    console.error('Dynamic Account Error:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to generate payment account' });
  }
});

router.post(`/v1/paymentDelayUpdate/:reference?`, (req, res) => {
  console.log(req.body);
  const { reference } = req.params;
  if (req.body.status === 'PENDING') {
    const FailedQuery = `update cart 
set status = 'FAILED' where monnify_ref = ?;`


    db.query(FailedQuery, [reference], (err, FailedQueryData) => {
      if (err) {
        console.log(`Cart update with Referencing Error`, err);

      } else {
        return res.status(200).json({ message: `Transaction Failed Please initiate a new Transaction` })
      }
    })
  } else {
    return res.status(401).json({ error: `No Status Request receive` })
  }
})

module.exports = router;
