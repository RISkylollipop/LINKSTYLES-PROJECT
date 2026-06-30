const express = require(`express`);
const router = express.Router();
const { db, dbPool } = require(`../database`);
const { userAuth } = require(`../Controllers/usersAuth`);
const { subscriberMail } = require(`../utilitis/sendMails`);

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address" });
  }

  try {
    const [emailQueryRes] = await dbPool.query(
      `select email from subscribers where email = ?`,
      [email],
    );
    if (emailQueryRes[0]) {
      console.log(`Already a subscriber`);
      return res.status(403).json({
        message: `${email} is already a subcriber /n 
          Thank You For Choosing Us`,
      });
    } else if (!emailQueryRes[0]) {
      const [emailInsertRes] = await dbPool.query(
        `INSERT INTO subscribers set ?`,
        { email },
      );
      if (emailInsertRes.affectedRows > 0) {
        console.log(`User ${email} Subscribed Successfully`);
        subscriberMail({
          email,
        });
        return res
          .status(200)
          .json({ message: "Thanks for subscribing to our newsletter!" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Later for auto display data upon writing email
// router.get(`/api/v1/getuserdetail`, (req, res) => {
//   const getUser = `select * from users;`
//   db.query(getUser, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ error: 'Database error' });
//     } else {
//       return res.status(200).json(data);
//     }
//   });
// });

router.post("/deliverydetails", userAuth(), (req, res) => {
  const { filterCartAndPayload } = req.body;
  console.log(req.body);

  const {
    fullName,
    phoneNumber,
    email,
    streetAddress,
    city,
    state,
    country,
    deliveryNote,
    paymentMode,
  } = req.body;

  if (
    !fullName ||
    !phoneNumber ||
    !email ||
    !streetAddress ||
    !city ||
    !state ||
    !country
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  cartItem = JSON.stringify(req.body.Items);
  // Check if email exists
  const checkEmailQuery = `select * from users where email = ? or phone_number = ?`;
  db.query(checkEmailQuery, [email, phoneNumber], (err, usersResult) => {
    if (err) {
      return res.status(500).json({ error: "Error checking email" });
    } else if (!usersResult[0]) {
      // console.log(usersResult);

      return res.json({
        error: `Please login/register to continue`,
      });
    } else if (usersResult.length > 1) {
      return res.status(401).json({ error: `Duplicate User detail` });
    } else if (usersResult.length === 1) {
      const userId = usersResult[0].id;
      // In a common sense, a customer can have many delivery detail like state and country
      // but different order number which will be meant for tracking
      //
      const generateTrackingID = () => {
        const random = Math.floor(Math.random() * 900000) + 132210;
        const timestamp = Date.now();
        const orderId = `DLV-${timestamp}-${random}`;
        return orderId;
      };

      const insertQuery = `INSERT INTO delivery_details SET ?`;
      const deliveryData = {
        full_name: fullName,
        phone_number: phoneNumber,
        email,
        street_address: streetAddress,
        city,
        state,
        country,
        delivery_note: deliveryNote,
        payment_type: paymentMode,
        userId: userId,
        cartItem: cartItem,
        trackingId: generateTrackingID(),
      };

      // Insert delivery details
      db.query(insertQuery, deliveryData, (err, insertResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error while saving data" });
        }

        console.log("Delivery detail sent to company");

        return res.json({ message: "Delivery detail sent to company" });
      });
    }
  });
});

module.exports = router;
