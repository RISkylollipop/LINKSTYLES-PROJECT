const express = require(`express`);
const path = require(`path`);
const bcrypt = require(`bcrypt`);
const cors = require("cors");
require(`dotenv`).config();
const db = require(`./database`);
const paymentRoute = require(`./routes/payment`);
const gatewayRoute = require(`./routes/gateway`);
const loginRoute = require(`./routes/login`);
const registerRoute = require(`./routes/register`)
const addProductRoute = require(`./pages/AddProduct`)
const shoeProductRoute = require(`./pages/shoesProducts`)
const detailsPageRoute = require(`./pages/detailsPages`)

const cloudinary = require(`cloudinary`).v2;
const {RegistrationMail} = require(`./utilitis/sendMails`);
const {userAuth, adminAuth} = require(`./Controllers/usersAuth`)


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

const allowedOrigins = ["http://localhost:5173"]; 

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
app.use(`/api`, registerRoute);
app.use(`/api/v1`, addProductRoute)
app.use(`/api/v1`, shoeProductRoute)
app.use(`/`, detailsPageRoute)
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../LinkStyles")));

app.get(`/api/products`, (req, res) => {
  res.json(data);
});

app.get(`/api/v1/clothes`, (req, res) => {
  
  const query = `select * from products where category = "clothing" 
  or category = "other" order by rand();`
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});



async function getLocationData() {
  try {
    // Try first API (ipwhois.app)
    let response = await fetch("https://ipwhois.app/json/");
    let data = await response.json();

    // console.log(data.ip);

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
      return data;
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

// app.post(`/api/v1/submit`, (req, res) => {
  //   const { name, email, message } = req.body;
  
  //   console.log(req.body);
//   if (!email || !name || !message) {
//     

//  return res.status(404).json({ error: "Detail Submitted Not Completed" });
//   }
//   db.query(
//     `INSERT INTO messages SET ?`,
//     { name, email, message, priority: "Medium" },
//     (err, result) => {
//       if (err) {
//         return res.json({ error: "Error Uploading Detail" });
//       }
//       res.json({ message: "FORM SUBMITTED TO BACKEND" });
//       transporter.sendMail(mailoption, (error, info) => {
  //         if (error) {
    //           console.log(`Error: Unable to send mail to ${email}`);
//         } else {
  //           console.log(`Email Sent to ${email} ${info.response}`);
//         }
//       });
//     }
//   );
// });



app.get(`/api/v1/getusers`, (req, res) => {
  const getUser = `select * from users;`
  db.query(getUser, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Database error" });
    } else {
      return res.status(200).json(data);
    }
  });
});

app.get('/refreshpage', userAuth(), (req, res)=> {
  return res.status(200).json({message: `OK`})
})
app.get('/verifyadmin', adminAuth(), (req, res)=> {
  return res.status(200).json({message: `OK`})
})



app.post(`/logout`, (req, res)=> {
  // console.log(req.body);
  const  email = req.body.email
  const LogoutQuery = `update users set jwt_version = jwt_version + 1 where email = ?`
  db.query(LogoutQuery, [email], (err, data)=>{
    if(err){ 
      
      console.log(`Database Query Error`);
      return res.status(500).json({error : `Internal Error`})
    }
    else{
      res.status(200).json({message: `Logout Successfully See You Soon 👋👋`})
    }
  })
  
})


app.listen(port, () => {
  console.log(`App Listening on ${port}`);
});
