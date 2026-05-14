const express = require('express');
const router = express.Router();
require('dotenv').config();
const { rateLimit } = require(`express-rate-limit`)
const {db, dbPool} = require(`../database`)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');







const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      statusmsg: 'fail',
      msg: `To many failed attempt, please try again later in ${Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000 / 60)} minutes`,
      remainingAttempt: req.rateLimit.remaining
    })
  }
})


router.post('/v1/login', loginLimiter, (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, data) => {
    if (err) {
      console.log('DB error:', err);
      return res.status(500).json({ error: 'Database error' });
    } else if (data.length === 0) {
      // console.log('Email not found');
      return res.status(404).json({ error: 'Email not found. Please register first.' });
    }

    try {
      const hashedPassword = data[0].password;
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (!isMatch) {
        return res.status(401).json({ error: 'Password does not match' });
      }

      const secretKey = process.env.JWT_SECRET_TOKEN;

      const token = jwt.sign(
        {
          Id: data[0].id,
          name: data[0].first_name,
          tokenVersion: data[0].jwt_version,
          jti: Date.now().toString(),
        },
        secretKey,
        {
          expiresIn: '1h',
          issuer: 'MedicsHealth',
        }
      );

      const selectUserQuery = `SELECT user_id, profilepicture, first_name, lastname,
                              users.email, user_roles.role_id, user_roles.role_name FROM users 
                              LEFT JOIN user_roles ON users.id = user_roles.user_id WHERE users.email = ?;`;

      db.query(selectUserQuery, [data[0].email], (err, result) => {
        if (err) {
          console.log('Error loading user details:', err);
          return res.status(500).json({ error: 'Error loading user details' });
        }

        const MainData = result[0]
        // console.log(result[0]);

        if (result[0].role_name === 'admin' && result[0].role_id === 1) {
          const role = result[0].role_name;
          const name = result[0].first_name;
          const Admingreeting = `Welcome ${role} ${name}`;

          db.query(`SELECT * FROM products`, (err, productLenght) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Failed to load admin data' });
            }
            console.log(`Admin Logging in.....`);
            return res.status(200).json({
              message: 'Admin Login successfully',
              token,
              MainData,
              Admingreeting,
              productLenght: productLenght.length,
            });
          });
        }


        else if (result[0].role_name === 'merchant' && result[0].role_id === 2) {

          const role = result[0].role_name;
          const dataEmail = data[0].email;
          const merchentQuery = `select merchantProductId, name, email, phone, store_name, 
bank_name, account_number, account_name, wallet_balance, is_verified
from merchants where email = ?`;
          db.query(merchentQuery, [dataEmail], (err, merchantsData) => {
            if (err) {
              console.log(`Merchant fetch error: `, err);
            }
            else if (merchantsData[0]) {
              console.log(merchantsData[0]);
              
              const merchantProductId = merchantsData[0].merchantProductId;
              const merchantProductQuery = `SELECT product_id, productName, 
              category, price, stock, sales, status from products where merchantPID = ? order by rand()`;
              db.query(merchantProductQuery, [merchantProductId], (productError, productData) => {
                if (productError) {
                  console.log(`Product fetch Error  : `, productError);
                  return res.status(403).json({ error: `Internal Error` })
                } else {
                  
                  const merchantName = merchantsData[0].name;
                  const merchantProduct = productData;
                  // console.log(merchantProduct);
                  console.log(`Merchant Logging in.....`);
                  const merchantData = merchantsData[0]

                  return res.status(200).json({
                    message: `Welcome Back Merchant ${merchantName}`,
                    token,
                    MainData,
                    merchantName,
                    merchantProduct,
                    role,
                    merchantData
                  })
                }
              })
            }
          })



        }

        else {
          console.log(`User Logging in.....`);


          return res.status(200).json({
            message: 'Login successful',
            token,
            MainData
          });
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  });
});

module.exports = router;
