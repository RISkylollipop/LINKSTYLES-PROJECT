const express = require("express");
const router = express.Router();
require("dotenv").config();
const { rateLimit } = require(`express-rate-limit`);
const { db, dbPool } = require(`../database`);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      statusmsg: "fail",
      msg: `To many failed attempt, please try again later in ${Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000 / 60)} minutes`,
      remainingAttempt: req.rateLimit.remaining,
    });
  },
});

router.post("/v1/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  const emailquery = "SELECT * FROM users WHERE email = ?";

  const [loginData] = await dbPool.query(emailquery, [email]);
  if (loginData.length === 0) {
    console.log("DB error");
    return res
      .status(404)
      .json({ error: "Email not found. Please register first." });
    // return res.status(500).json({ error: 'Database error' });
  } else if (loginData[0]) {
    try {
      const hashedPassword = loginData[0].password;
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "Password Or Email is Incorrect" });
      }

      const secretKey = process.env.JWT_SECRET_TOKEN;

      const token = jwt.sign(
        {
          Id: loginData[0].id,
          name: loginData[0].first_name,
          tokenVersion: loginData[0].jwt_version,
          function: loginData[0].functions,
          verify: loginData[0].is_verified,
          jti: Date.now().toString(),
        },
        secretKey,
        {
          expiresIn: "1h",
          issuer: "MedicsHealth",
        },
      );

      const selectUserQuery = `SELECT user_id, profilepicture, first_name, lastname,
                              users.email, user_roles.role_id, user_roles.role_name FROM users 
                              LEFT JOIN user_roles ON users.id = user_roles.user_id WHERE users.email = ?;`;

      const searchmail = loginData[0].email;
      const [getRolesData] = await dbPool.query(selectUserQuery, [searchmail]);
      const result = getRolesData[0]; // Response 1

      if (result.role_name === "admin" && result.role_id === 1) {
        const role_name = result.role_name; // Response 2
        const name = result.first_name;
        const Admingreeting = `Welcome ${role_name} ${name}`; // Response 4

        const productReqQuery = `select product_id, productName, category, description, price, stock, 
        image1, created_time, rating, merchantPID, sales, status from products`;
        const userReqQuery = `select id, profilepicture, concat(first_name,' ',lastname,' ', middle_name) as Fullname, email, 
        phone_number, address, city, state, country, is_verified, functions from users;`;

        const [[allProducts], [allUsers], [allOrderItems], [allOrders]] =
          await Promise.all([
            dbPool.query(productReqQuery),
            dbPool.query(userReqQuery),
            dbPool.query(`select * from order_items`),
            dbPool.query(`select * from orders`),
          ]);

        // all data response 5,6,7,8
        // All admin Data Response Goes Here

        console.log(`Admin Logging in.....`);
        return res.status(200).json({
          message: "Admin Login successfully",
          token,
          MainData: result,
          Admingreeting,
          allProducts,
          allUsers,
          allOrders,
          allOrderItems,
        });
      } 
      
      else if (result.role_name === "merchant" && result.role_id === 2) {
        const role = result.role_name;
        const searchmail = loginData[0].email;
        const merchentQuery = `select merchantProductId, name, email, phone, store_name, 
bank_name, account_number, account_name, wallet_balance, is_verified
from merchants where email = ?`;
        const [merchantReqQuery] = await dbPool.query(merchentQuery, [searchmail]);
        if (merchantReqQuery.length === 0) {
          console.log(`Database Query Error: No Data Returned`);
          return res.status(500).json({ error: "Error loading user details" });
        } 
        else if (merchantReqQuery[0]) {
          console.log(merchantReqQuery[0]);
          const merchantData = merchantReqQuery[0];

          const merchantProductId = merchantReqQuery[0].merchantProductId;
          const merchantName = merchantReqQuery[0].name;
          const merchantProductQuery = `SELECT product_id, productName, 
           category, price, stock, sales, status from products where merchantPID = ? order by rand()`;

          const [merchantProductQueryData] = await dbPool.query(
            merchantProductQuery,
            [merchantProductId],
          );
          if (merchantProductQueryData.length === 0) {
            console.log(
              `Product fetch Error  : Unable to Fetch Merchant Product `,
            );
            return res.status(403).json({ error: `Internal Error` });
          } else {
            console.log(`Merchant Logging in.....`);
  
            const merchantProduct = merchantProductQueryData;

            return res.status(200).json({
              message: `Welcome Back Merchant ${merchantName}`,
              token,
              MainData: result,
              merchantName,
              merchantProduct,
              role,
              merchantData,
            });
          }
        }
      } 
      
      else {
        console.log(`User Logging in.....`);

        return res.status(200).json({
          message: "Login successful",
          token,
          MainData: result,
        });
      }
    } catch (error) {
      console.error(`Login Error:`, error)
    return res.status(500).json({ error: `Internal server error` })
    }
  }
});

module.exports = router;
