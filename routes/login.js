const express = require('express');
const router = express.Router();
require('dotenv').config();
const { rateLimit } = require(`express-rate-limit`)
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');







const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 3,
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

      const selectUserQuery = `SELECT user_id, profilepicture, first_name, lastname, middle_name, 
                              users.email, user_roles.role_id, user_roles.role_name FROM users 
                              LEFT JOIN user_roles ON users.id = user_roles.id WHERE users.email = ?;`;

      db.query(selectUserQuery, [data[0].email], (err, result) => {
        if (err) {
          console.log('Error loading user details:', err);
          return res.status(500).json({ error: 'Error loading user details' });
        }

        if (result[0].role_name === 'admin' && result[0].role_id === 1) {
          const role = result[0].role_name;
          const name = result[0].first_name;
          const Admingreeting = `Welcome ${role} ${name}`;

          db.query(`SELECT * FROM products`, (err, productLenght) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Failed to load admin data' });
            }

            return res.status(200).json({
              message: 'Admin Login successfully',
              token,
              MainData: result[0],
              Admingreeting,
              productLenght: productLenght.length,
            });
          });
        } else {
          console.log(result[0].first_name);

          return res.status(200).json({
            message: 'Login successful',
            token,
            MainData: result[0],
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
