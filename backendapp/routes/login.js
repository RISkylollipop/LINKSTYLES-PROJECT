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

      
      const token = jwt.sign(
        {
          Id: data[0].id,
          name: data[0].first_name,
          tokenVersion: data[0].jwt_version,
          jti: Date.now().toString()
        },
        secretKey,
        {
          expiresIn: "1h",
          issuer: "MedicsHealth",
        }
      );

      const selectUserQuery = `SELECT user_id, profilepicture, first_name, lastname, middle_name, 
                            users.email, is_verified, user_roles.role_id, user_roles.role_name FROM users 
                            left join user_roles on users.id = user_roles.id WHERE users.email = ?;`

      db.query(selectUserQuery, [data[0].email], (err, result) => {
        if (err) {
          console.log("Error loading user details:", err);
          return res.status(500).json({ message: "Error loading user details" });
        }
        // console.log(result);
        if (result[0].role_name === "admin" && result[0].role_id === 1) {



          const role = result[0].role_name;
          const name = result[0].first_name;
          const Admingreeting = `Welcome ${role} ${name}`

          db.query(`select * from products`, (err, productLenght) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: "Failed to load admin data" });

            }

            return res.status(200).json({
              message: "Admin Login successfully",
              token,
              MainData: result[0],
              Admingreeting,
              productLenght: productLenght.length,
            });
          });

        } else {

          console.log(result[0].first_name);

          return res.status(200).json({
            message: "Login successful",
            token, // ✅ To be return to the client, so client can use it
            MainData: result[0],
          });
        }
      }

      );
    }
  });
});

module.exports = router;
