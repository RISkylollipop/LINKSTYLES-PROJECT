const express = require("express");
const router = express.Router();
require("dotenv").config();
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/v1/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) {
      console.log("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    } else if (data.length === 0) {
      console.log("Email not found");
      return res.status(404).json({ message: "Email not found. Please register first." });
    } else {
      const hashedPassword = data[0].password;
      const isMatch = await bcrypt.compare(password, hashedPassword);

      if (!isMatch) {
        return res.status(401).json({ message: "Password does not match" });
      }

      const secretKey = process.env.JWT_SECRET_TOKEN;

      // ✅ Use data[0] instead of users
      const token = jwt.sign(
        {
          Id: data[0].Id,
          name: data[0].first_name,
          tokenVersion: data[0].jwt_version,
        },
        secretKey,
        {
          expiresIn: "15m",
          issuer: "MedicsHealth",
        }
      );

      const selectUserQuery = "SELECT * FROM delivery_details WHERE email = ?";
      db.query(selectUserQuery, [data[0].email], (err, result) => {
        if (err) {
          console.log("Error loading user details:", err);
          return res.status(500).json({ message: "Error loading user details" });
        }

        if (result.length === 0) {
          return res.status(200).json({
            message: "Login successful, but no delivery details found.",
            token, // ✅ To be return to the client, so client can use it
            MainData: data[0],
          });
        }

        console.log(result[0]);
        return res.status(200).json({
          message: "Login successful",
          token, // ✅ To be included in response sent and to be save in localStorage
          newData: result[0].full_name,
          // MainData: result[0],
        });
      });
    }
  });
});

module.exports = router;
