const express = require(`express`);
const router = express.Router();
const { db, dbPool } = require("../database");
const { query } = require("express");

router.get(`/clothes`, async (req, res) => {
  try {
    const query = `SELECT * FROM products WHERE category = 'clothing' 
    OR category = 'other' ORDER BY RAND();`;

    const [data] = await dbPool.query(query);
    if(data.length > 0){
      return res.status(200).json(data);

    }
    else{
      return res.status(404).json({error: `Unable to fetch product details`})
    }

  } catch (err) {
    console.error(err, "Error fetching clothes");
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/clothes/:id", async (req, res) => {

  try {
    const productId =  req.params.id;
    const query = `select * from products where product_id = ? and category = 'clothing' order by rand()`;
    const [data] = await dbPool.query(query, [productId])
    
    if(data.length > 0){
      return res.status(200).json(data)
    }else{
      return res.status(404).json({error: `Unable to fetch product details`})
    }

  } catch (error) {
     console.error(err, "Error fetching cloth detail");
    res.status(500).json({ error: "Internal server error" });
  }

});

module.exports = router;
