const express = require(`express`)
const router = express.Router()
const {db, dbPool} = require(`../database`)
const { userAuth } = require(`../Controllers/usersAuth`)


router.post('/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res
      .status(400)
      .json({ error: 'Please provide a valid email address' });
  }

  db.query(
    'SELECT email FROM subscribers WHERE email = ?',
    [email],
    (err, result) => {
      if (err) {
        console.error('Database select error:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      if (result.length > 0) {
        return res
          .status(400)
          .json({ error: `${email} is already a subscriber` });
      }

      db.query('INSERT INTO subscribers SET ?', { email }, (err, msg) => {
        if (err) {
          console.error('Database insert error:', err);
          return res
            .status(500)
            .json({ error: 'Could not subscribe, try again later' });
        }

        res
          .status(200)
          .json({ message: 'Thanks for subscribing to our newsletter!' });
      });
    }
  );
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

router.post('/deliverydetails', userAuth(), (req, res) => {
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
    paymentMode
  } = req.body;

  if (
    !fullName ||
    !phoneNumber ||
    !email ||
    !streetAddress ||
    !city ||
    !state ||
    !country) {

    return res.status(400).json({ message: 'Missing required fields' });
  }

  cartItem = JSON.stringify(req.body.Items)
  // Check if email exists
  const checkEmailQuery = `select * from users where email = ? or phone_number = ?`;
  db.query(checkEmailQuery, [email, phoneNumber], (err, usersResult) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking email' });
    }

    else if (!usersResult[0]) {
      // console.log(usersResult);

      return res.json({
        error: `Please login/register to continue`,

      });
    } 
    else if(usersResult.length > 1){
      return res.status(401).json({error: `Duplicate User detail`})
    }
    else if (usersResult.length === 1) {
      const userId = usersResult[0].id
      // In a common sense, a customer can have many delivery detail like state and country 
      // but different order number which will be meant for tracking
      // 
      const generateTrackingID = () => {
        const random = Math.floor(Math.random() * 900000) + 100000;
        const timestamp = Date.now()
        const orderId = `DLV-${timestamp}-${random}`
        return orderId
      }


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
        trackingId : generateTrackingID(),
      };

    // Insert delivery details
      db.query(insertQuery, deliveryData, (err, insertResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error while saving data' });
        }

        console.log('Delivery detail sent to company');
        
        return res.json({ message: 'Delivery detail sent to company' });
      });


    }






  });
});

module.exports = router