const express = require('express');
const { db, dbPool } = require('../database');
const router = express.Router();
const multer = require('multer');

const cloudinary = require(`cloudinary`).v2

// Configure Multer storage
const upload = multer({ dest: 'public/images' });

const { adminAuth } = require(`../Controllers/usersAuth`)

router.post('/v1/addoldproduct', adminAuth(), (req, res) => {
  const { productName, description, price, category, discountPrice,
    stock,
    imageUrl,
    imageUrl2,
    imageUrl3
  } = req.body;

  console.log('Form Fields:', req.body);


  // Validate Mandatory Fields
  if (!productName || !description || !price || !category || !stock) {
    return res.status(400).json({
      message: 'Missing required fields',
    });
  }

  // Prepare SQL data
  const insertData = {
    productName,
    description,
    price,
    category,
    stock,
    image1: imageUrl || null,
    image2: imageUrl2 || null,
    image3: imageUrl3 || null,
  };

  const sql = 'INSERT INTO products SET ?';

  try {
    const [result] = dbPool('INSERT INTO products SET ?', insertData)
    console.log(result.insertId);
    return res.json({
      message: 'Product added successfully',
      productId: result.insertId,
    });

  } catch (error) {
    console.log(error);
    console.error(error)
  }

});


router.post(
  '/addproduct', adminAuth(),
  upload.array('images', 3), // limit to 3 images
  async (req, res) => {
    try {
      console.log('Form fields:', req.body);

      const { productName, description, price, category, stock, discountedPrice } = req.body;

      // Basic validation
      if (!productName || !price || !category || !stock) {
        return res.status(400).json({
          error: 'Required fields missing',
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          error: 'At least one image is required',
        });
      }

      const imageUrls = [];

      for (const file of req.files) {
        const uploaded = await cloudinary.uploader.upload(file.path, {
          folder: 'uploadlearn',
        });

        imageUrls.push(uploaded.secure_url);
      }

      // Ensure exactly 3 image columns
      while (imageUrls.length < 3) {
        imageUrls.push(null);
      }

      const insertData = {
        productName,
        category,
        description,
        price: discountedPrice || price,
        stock,
        image1: imageUrls[0],
        image2: imageUrls[1],
        image3: imageUrls[2],
      };

      const sql = `INSERT INTO products SET ?`;

      db.query(sql, insertData, (err, result) => {
        if (err) {
          console.error('MySQL Insert Error:', err);
          return res.status(500).json({
            message: 'Database insertion failed',
          });
        }
        else {
          console.log(result.insertId);

          res.status(201).json({
            message: 'Product successfully added',
            product_id: result.insertId,
          });
        }

      });
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
);


router.get(`/products`, async (req, res) => {

  try {
    const query = `select * from products`;

    const [data] = await dbPool.query(query)
    
    return res.status(200).json(data)
  } catch (error) {
    console.log(error);
    console.error(error)
  }

});

module.exports = router;



