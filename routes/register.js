const express = require(`express`)
const router = express.Router()
const bcrypt = require(`bcrypt`)
const {db, dbPool} = require(`../database`)
const multer = require(`multer`);

const { RegistrationMail } = require(`../utilitis/sendMails`)

const fs = require(`fs`)

if (!fs.existsSync('upload/images')) {
  fs.mkdirSync('upload/images', { recursive: true })
}

const upload = multer({ dest: 'upload/images' });

const cloudinary = require(`cloudinary`).v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPI,
  api_secret: process.env.CLOUDAPIS,
});



router.post('/register', upload.single('profilePicture'), async (req, res) => {
  const {
    first_name,
    lastname,
    middle_name,
    email,
    phone_number,
    password,
    address,
    city,
    confirmpassword,
    functions,
    state,
    country,
    nearest_landmark,
  } = req.body;

  // console.log(req.body);


  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: 'Please upload a profile picture' });
    }

    const hashedpassword = await bcrypt.hash(password, 15);
    const filePath = req.file.path;

    // Checking if email already exists
    db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result[0]) {
        console.log('Registration failed — email already exists');

        return res
          .status(409) // 409  is status code we used for Conflict data: meaning it exist before
          .json({ message: 'Registration failed — email already exists' });
      }

      // Upload image to Cloudinary here
      cloudinary.uploader.upload(
        filePath,
        { folder: 'UploadLearn' },
        (err, uploadResult) => {
          if (err) {
            console.error('Cloudinary error:', err);
            return res.status(500).json({ message: 'Cloud upload failed' });
          }
          // saving the coming url from cloudinary response here
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
            functions,
          };

          // insert the data coming from the frontend req.body
          db.query(sql, userData, async (err, data) => {
            if (err) {
              console.error('DB error:', err);
              return res
                .status(500)
                .json({ message: 'Database insertion failed' });
            }

            console.log('Registration completed');

            res.status(201).json({
              message: 'Registration successfully processed',
              userId: data.insertId,
            });


            RegistrationMail({
              first_name, lastname, middle_name,
              email, phone_number, password,
              address, city, state, country,
            }).catch(err => console.error('RegistrationMail failed:', err));

          });
        }
      );
    });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});









module.exports = router