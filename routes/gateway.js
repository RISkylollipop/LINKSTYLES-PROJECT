const express = require('express');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();
const db = require(`../database`)
const { sendMail, sendCompanyMail, RegistrationMail } = require(`../utilitis/sendMails`);


const companyMail = process.env.COMPANYMAIL



// Store confirmed payments in memory (safe for testing, use DB in production)
const confirmedPayments = new Map();

/**
 * ✅ Webhook endpoint Monnify will call
 * Verifies the signature for security
 */

router.post('/monnify/webhook', express.json({ type: '*/*' }), async (req, res) => {
    try {
        const secretKey = process.env.API_SECRET;

        

        const signatureHeader = req.headers['monnify-signature'];
        const bodyString = JSON.stringify(req.body);
        const generatedSignature = crypto
            .createHmac('sha512', secretKey)
            .update(bodyString)
            .digest('hex');

        if (signatureHeader !== generatedSignature) {
            console.log('⚠️ Invalid signature');
            return res.status(403).send('Invalid signature');
        }

        // -----------------------------

        const { eventType, eventData } = req.body;

        // For testing with curl, eventType might be undefined
        if ((eventType === 'SUCCESSFUL_TRANSACTION' || !eventType) && eventData.paymentStatus === 'PAID') {
           
            console.log("EVENT TYPE :",  eventType);
            console.log("EVENT DATA :",  eventData);
            
            const {
                transactionReference,
                paymentReference,
                amountPaid,
                paidOn,
                customer,
                metaData
            } = eventData;

            console.log('PAYMENT CONFIRMED for', transactionReference);

            // Store payment in memory (optional)

            confirmedPayments.set(transactionReference, {
                paymentReference,
                amountPaid,
                status: eventData.paymentStatus,
                transactionReference,
                paidOn
            });

            // Extract email and name (null for curl test unless passed in payload)
            const customerEmail = customer?.email || metaData?.customerEmail
            const customerName = customer?.name || metaData?.customerName

            // Query DB for the cart data
            // console.log(transactionReference);

            db.query(
                `SELECT items FROM cart WHERE monnify_ref = ? AND reference_id = ? AND amount = ?`,
                [transactionReference,paymentReference,amountPaid],
                async (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('DB query error');
                    }

                    if (result.length === 0) {
                        console.log('⚠️ No matching cart found.');
                        return res.status(404).send('Cart not found');
                    }

                    if (result.length > 1) {
                        console.log('⚠️ Duplicate cart data, please check manually.');
                         return res.status(404).send(`Duplicate data`)

                    }
                    let cartItem = result[0].items

                    // console.log("DB items value:", result[0].items);

                    db.query(`update cart set status = "PAID" where monnify_ref = ? AND reference_id = ? AND amount = ?`,
                        [transactionReference, paymentReference, amountPaid],
                        async (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json(`Payment Cound Not be Completed`)
                            } else {
                                console.log(`cart payment updated successfully`);
                                

                                db.query(`select * from delivery_details where email = ?`, [customerEmail], (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        return res.json(`No customer data Found`)

                                    } else {
                                        console.log(data);

                                    }
                                })

                            }
                        })

                    // Send confirmation email

                    // Send confirmation email to customer
                    await sendMail({
                        customerEmail,
                        customerName,
                        amount: amountPaid,
                        filtercart: result[0].items,

                    });

                    // Send order notification to company
                    await sendCompanyMail({
                        companyEmail: companyMail || process.env.COMPANYMAIL,
                        customerEmail,
                        customerName,
                        amount: amountPaid,
                        filtercart: result[0].items
                    });

                    res.status(200).send('Webhook processed successfully');


                }
            );
        } else {
            res.status(400).send('Unhandled event');
        }
    } catch (err) {
        console.error('Webhook error:', err.message);
        res.status(500).send('Webhook processing error');
    }
});


/**
 * ✅ Payment status endpoint your frontend will call
 * Can check by transaction reference or get all payments
 */
router.get('/payment/status/:reference?', (req, res) => {
    const { reference } = req.params;

    if (reference) {
        db.query(
            `SELECT status FROM cart WHERE monnify_ref = ? AND status = "PAID"`,
            [reference],
            (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Database query error' });
                }
                // If no record found, return PENDING
                if (!data[0]) {
                    return res.json({ status: 'PENDING' });
                }

                console.log(data);
                return res.json({message : "PAYMENT CONFIRMED"});
            }
        );
    } else {
        // For debugging: return in-memory confirmed payments
        return res.json(Array.from(confirmedPayments.values()));
    }
});



module.exports = router;
