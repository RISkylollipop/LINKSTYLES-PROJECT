const express = require("express");
const db = require("../database");
const router = express.Router();
const multer = require("multer");

const cloudinary = require(`cloudinary`).v2

// Configure Multer storage
const upload = multer({ dest: "public/images" });

router.post("/v1/addoldproduct", (req, res) => {
  const {productName,description,price,category,
    stock,
    imageUrl,
    imageUrl2,
    imageUrl3
  } = req.body;

  console.log("Form Fields:", req.body);

  // Validate Mandatory Fields
  if (!productName || !description || !price || !category || !stock) {
    return res.status(400).json({
      message: "Missing required fields",
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

  const sql = "INSERT INTO products SET ?";
  db.query(sql, insertData, (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    console.log("Product inserted successfully:", result);

    return res.json({
      message: "Product added successfully",
      productId: result.insertId,
    });
  });
});

router.post(
  "/addproduct",
  upload.array("images", 3), // limit to 3 images
  async (req, res) => {
    try {
      console.log("Form fields:", req.body);

      const { productName, description, price, category, stock } = req.body;

      // Basic validation
      if (!productName || !price || !category || !stock) {
        return res.status(400).json({
          message: "Required fields missing",
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          message: "At least one image is required",
        });
      }

      /* =============================
          Upload images to Cloudinary
      ============================== */
      const imageUrls = [];

      for (const file of req.files) {
        const uploaded = await cloudinary.uploader.upload(file.path, {
          folder: "uploadlearn",
        });

        imageUrls.push(uploaded.secure_url);
      }

      // Ensure exactly 3 image columns
      while (imageUrls.length < 3) {
        imageUrls.push(null);
      }

      /* =============================
          Prepare DB Insert Data
      ============================== */
      const insertData = {
        productName,
        category,
        description,
        price,
        stock,
        image1: imageUrls[0],
        image2: imageUrls[1],
        image3: imageUrls[2],

        // created_time → DB default timestamp
        // product_id → AUTO_INCREMENT
      };

      const sql = `INSERT INTO products SET ?`;

      db.query(sql, insertData, (err, result) => {
        if (err) {
          console.error("MySQL Insert Error:", err);
          return res.status(500).json({
            message: "Database insertion failed",
          });
        }

        res.status(201).json({
          message: "Product successfully added",
          product_id: result.insertId,
        });
      });
    } catch (error) {
      console.error("Server Error:", error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

module.exports = router;



