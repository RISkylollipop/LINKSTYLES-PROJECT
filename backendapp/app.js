const express = require(`express`);
const path = require(`path`);
const bcrypt = require(`bcrypt`);
const cors = require("cors");
require(`dotenv`).config();
const db = require(`./database`);
const paymentRoute = require(`./routes/payment`);
const gatewayRoute = require(`./routes/gateway`);
const loginRoute = require(`./routes/login`);
const addProductRoute = require(`./pages/AddProduct`)
const shoeProductRoute = require(`./pages/shoesProducts`)
const multer = require(`multer`);
const upload = multer({ dest: `/upload/images` });
const cloudinary = require(`cloudinary`).v2;
const {RegistrationMail} = require(`./utilitis/sendMails`);

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPI,
  api_secret: process.env.CLOUDAPIS,
});
const app = express();
const port = 3005;

// // middlewares
// // app.use(cors({origin: 'http://localhost:5174'}))
// // Supplied origin must tally with frontend server
// //alternative for not supplying Origin of Frontend is:

const allowedOrigins = ["http://localhost:5173"]; // Remove empty string

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    //   credentials: true, // Allow cookies & authentication (if needed)
  })
);

app.use(express.json());
app.use("/api", paymentRoute);
app.use(`/`, gatewayRoute);
app.use(`/api`, loginRoute);
app.use(`/api/v1`, addProductRoute)
app.use(`/api/v1`, shoeProductRoute)
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../LinkStyles")));

app.get(`/api/products`, (req, res) => {
  res.json(data);
});

app.get(`/api/v1/clothes`, (req, res) => {
  const category = req.query.category;
  const query = `select * from products where category = "clothing" order by rand()`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// app.get(`/api/v1/phones`, (req, res) => {
//   const category = req.query.category;
//   const query = `select * from iphones order by rand()`;
//   db.query(query, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

async function getLocationData() {
  try {
    // Try first API (ipwhois.app)
    let response = await fetch("https://ipwhois.app/json/");
    let data = await response.json();

    console.log(data.ip);

    if (!data || data.error) {
      throw new Error("First API failed");
    }
    return data; // Return if successful
  } catch (error) {
    console.error("First API failed, trying backup...");

    // Try second API (ipinfo.io)
    try {
      let response = await fetch("https://ipinfo.io/json");
      let data = await response.json();
      return data; // Return if successful
    } catch (error) {
      console.error("Both APIs failed!");
      return { error: true, message: "Failed to get location data" };
    }
  }
}

app.get("/api/location", async (req, res) => {
  const locationData = await getLocationData();
  res.json(locationData);
});

app.get("/api/v1/clothes/:id", (req, res) => {
  const productId = req.params.id;
  
  db.query(
    `select * from products where product_id = ? and category = "clothing" order by rand()`,
    [productId],
    (err, result) => {
      if (err) {
        console.log(`product not Found/Fetch`);
      } else if (result[0]) {
        res.json(result);
      }
    }
  );
});

app.get(`/phone/:id`, (req, res) => {
  const phoneID = req.params.id;

  db.query(
    `select * from products where category = "electronics" and product_id = ?`,
    [phoneID],
    (err, data) => {
      if (err) {
        console.log(err, `Phone detail fetching Error`);
      } else if (data) {
        // console.log(`Data from Phone View Detail`,data);
        res.json(data);
      }
    }
  );
});

app.get(`/api/v1/phones`, (req, res) => {
    console.log(req.body);
    
  const query = `select * from products where productName LIKE "%phone%"`;

  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

app.post(`/api/v1/submit`, (req, res) => {
  const { name, email, message } = req.body;

  console.log(req.body);
  if (!email || !name || !message) {
    res.status(404).json({ error: "Detail Submitted Not Completed" });
  }
  db.query(
    `INSERT INTO messages SET ?`,
    { name, email, message, priority: "Medium" },
    (err, result) => {
      if (err) {
        return res.json({ error: "Error Uploading Detail" });
      }
      res.json({ message: "FORM SUBMITTED TO BACKEND" });
      transporter.sendMail(mailoption, (error, info) => {
        if (error) {
          console.log(`Error: Unable to send mail to ${email}`);
        } else {
          console.log(`Email Sent to ${email} ${info.response}`);
        }
      });
    }
  );
});

app.post("/register", upload.single("profilePicture"), async (req, res) => {
  const {
    first_name,
    lastname,
    middle_name,
    email,
    phone_number,
    password,
    address,
    city,
    state,
    country,
    nearest_landmark,
  } = req.body;

  console.log(req.body);

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Please upload a profile picture" });
    }

    const hashedpassword = await bcrypt.hash(password, 15);
    const filePath = req.file.path;

    // To Check if email already exists
    db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        console.log("Registration failed — email already exists");
        
        return res
          .status(409) // 409 for "Conflict"
          .json({ message: "Registration failed — email already exists" });
      }

      // Upload image to Cloudinary here
      cloudinary.uploader.upload(
        filePath,
        { folder: "UploadLearn" },
        (err, uploadResult) => {
          if (err) {
            console.error("Cloudinary error:", err);
            return res.status(500).json({ message: "Cloud upload failed" });
          }
          // get the url from cloudinary here
          const secureUrl = uploadResult.secure_url;

          // Insert new user data
          const sql = `INSERT INTO users SET ?`;

          const userData = {
            profilepicture: secureUrl,
            first_name: first_name,
            lastname: lastname,
            middle_name: middle_name,
            email,
            phone_number: phone_number,
            password: hashedpassword,
            address,
            city,
            state,
            country,
            nearest_landmark: nearest_landmark,
          };

          // insert the data coming from the frontend req.body
          db.query(sql, userData, async (err, data) => {
            if (err) {
              console.error("DB error:", err);
              return res
                .status(500)
                .json({ message: "Database insertion failed" });
            }

            console.log("Registration completed");

            await RegistrationMail({
              first_name,
              lastname,
              middle_name,
              email,
              phone_number,
              password,
              address,
              city,
              state,
              country,
            });

            return res.status(201).json({
              message: "Registration successfully processed",
              userId: data.insertId,
            });
          });
        }
      );
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get(`/api/getuser`, (req, res) => {
  const getUser = `SELECT * FROM user WHERE userId = 1`;
  db.query(getUser, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Database error" });
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

app.post("/api/v1/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address" });
  }

  db.query(
    "SELECT email FROM subscribers WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.error("Database select error:", err);
        return res.status(500).json({ error: "Server error" });
      }

      if (result.length > 0) {
        return res
          .status(400)
          .json({ error: `${email} is already a subscriber` });
      }

      db.query("INSERT INTO subscribers SET ?", { email }, (err, msg) => {
        if (err) {
          console.error("Database insert error:", err);
          return res
            .status(500)
            .json({ error: "Could not subscribe, try again later" });
        }

        res
          .status(200)
          .json({ message: "Thanks for subscribing to our newsletter!" });
      });
    }
  );
});

app.post("/api/v1/deliverydetails", (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    streetAddress,
    apartment,
    city,
    state,
    postalCode,
    country,
    deliveryNote,
  } = req.body;

  if (
    !fullName ||
    !phoneNumber ||
    !email ||
    !streetAddress ||
    !city ||
    !state ||
    !postalCode ||
    !country
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Check if email exists
  const checkEmailQuery = `SELECT email FROM delivery_details WHERE email = ?`;
  db.query(checkEmailQuery, [email], (err, emailResult) => {
    if (err) {
      return res.status(500).json({ message: "Error checking email" });
    }

    if (emailResult.length > 0) {
      return res.json({
        message: `Email: ${email} with this address ${streetAddress}, ${state} already exists`,
      });
    }

    // Check if phone number exists
    const checkPhoneQuery = `SELECT phone_number FROM delivery_details WHERE phone_number = ?`;
    db.query(checkPhoneQuery, [phoneNumber], (err, phoneResult) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error validating phone number" });
      }

      if (phoneResult.length > 0) {
        return res.json({
          message: "Phone number already linked to an address",
        });
      }

      // Insert delivery details
      const insertQuery = `INSERT INTO delivery_details SET ?`;
      const deliveryData = {
        full_name: fullName,
        phone_number: phoneNumber,
        email,
        street_address: streetAddress,
        apartment,
        city,
        state,
        postal_code: postalCode,
        country,
        delivery_note: deliveryNote,
      };

      db.query(insertQuery, deliveryData, (err, insertResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error while saving data" });
        }

        return res.json({ message: "Delivery detail sent to company" });
      });
    });
  });

  console.log(req.body);
});

app.listen(port, () => {
  console.log(`App Listening on ${port}`);
});
