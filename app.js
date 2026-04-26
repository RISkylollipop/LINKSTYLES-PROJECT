const express = require(`express`);
const path = require(`path`);
const cors = require('cors');
const helmet = require(`helmet`)
require(`dotenv`).config();
const {db, dbPool} = require(`./database`);
const paymentRoute = require(`./routes/payment`);
const gatewayRoute = require(`./routes/gateway`);
const loginRoute = require(`./routes/login`);
const registerRoute = require(`./routes/register`)
const addProductRoute = require(`./pages/AddProduct`)
const clothproduct = require(`./pages/clothproduct`)
const shoeProductRoute = require(`./pages/shoesProducts`)
const detailsPageRoute = require(`./pages/detailsPages`)
const phoneProductRoute = require(`./pages/phone`) 
const contactus = require(`./pages/contactus`)


const { userAuth, adminAuth } = require(`./Controllers/usersAuth`)




const app = express();
const port = process.env.PORT;




// // middlewares
// // app.use(cors({origin: 'http://localhost:5174'}))
// // Supplied origin must tally with frontend server
// //alternative for not supplying Origin of Frontend is:


// const allowedOrigins = process.env.ALLOWED_ORIGINS
const allowedOrigins = process.env.ALLOWED_ORIGINS;
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
      credentials: true, // Allow cookies & authentication (if needed)
  })
);

app.use(helmet())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', paymentRoute);
app.use(`/`, gatewayRoute);
app.use(`/api`, loginRoute);
app.use(`/api/v1`, registerRoute);
app.use(`/api/v1`, addProductRoute)
app.use(`/api/v1`, shoeProductRoute)
app.use(`/api/v1`, clothproduct)
app.use(`/`, detailsPageRoute)
app.use(`/`, phoneProductRoute)
app.use(`/api/v1`, contactus)

app.use(express.static(path.join(__dirname, '../LinkStyles')));







async function getLocationData(ip) {
  try {

    const ipdataToken = process.env.ipdataToken

    let response = await fetch(`https://api.ipdata.co/${ip}?api-key=${ipdataToken}`);

    let data = await response.json();

    // console.log(data.ip);

    if (!data || data.error) {
      throw new Error('First API failed');
    }

    return data; // Return if successful
  } catch (error) {
    console.error('First API failed, trying backup...');

    // Try second API (ipinfo.io)
    try {
      let response = await fetch(`https://ipinfo.io/${ip}/json/`);
      let data = await response.json();

      if (!data || data.error) {
        console.log(error);
        throw new Error('Second API failed');

      }

      return data;
    } catch (error) {
      console.error('Both APIs failed!');
      return { error: true, message: 'Failed to get location data' };
    }
  }
}

app.get('/api/location', async (req, res) => {
  
  const UserIP = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.headers['x-real-ip'] || req.socket.remoteAddress;
  
  const IP = `212.58.224.20`;

  console.log(`User IP : `, UserIP);
  

  const locationData = await getLocationData(UserIP);
  // console.log(locationData);

  res.json(locationData);
});

app.get('/api/v1/clothes/:id', (req, res) => {
  const productId = req.params.id;
  
  db.query(
    `select * from products where product_id = ? and category = 'clothing' order by rand()`,
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
    `select * from products where category = 'electronics' and product_id = ?`,
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

  const query = `select * from products where productName LIKE '%phone%'`;

  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});



app.get(`/api/v1/getusers`, (req, res) => {
  const getUser = `select * from users;`
  db.query(getUser, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      return res.status(200).json(data);
    }
  });
});

app.get('/refreshpage', userAuth(), (req, res) => {
  return res.status(200).json({ message: `OK` })
})
app.get('/verifyadmin', adminAuth(), (req, res) => {
  return res.status(200).json({ message: `OK` })
})



app.post(`/logout`, (req, res) => {
  // console.log(req.body);
  const email = req.body.email
  const LogoutQuery = `update users set jwt_version = jwt_version + 1 where email = ?`
  db.query(LogoutQuery, [email], (err, data) => {
    if (err) {

      console.log(`Database Query Error`);
      return res.status(500).json({ error: `Internal Error` })
    }
    else {
      res.status(200).json({ message: `Logout Successfully See You Soon` })
    }
  })

})

app.get('/', (req, res) => {
  setInterval(() => {
            db.query(`select 1`, (err, data)=> {
                if(err){
                    console.log('DB keep-alive failed:', err);
                    
                }
                else{
                    console.log('DB keep-alive ping sent out');
                    res.status(200).json({ message: 'Server is alive' });
                    
                }
            })
        }, 5 * 60 * 1000);
});

app.listen(port, () => {
  console.log(`App Listening on ${port}`);
});
