const express = require(`express`)
const router = express.Router()
const {db, dbPool} = require('../database')




router.get(`/clothes`, async (req, res) => {
  try {
    const query = `SELECT * FROM products WHERE category = 'clothing' 
    OR category = 'other' ORDER BY RAND();`

    const [data] = await dbPool.query(query)
    res.status(200).json(data)

  } catch (err) {
    console.error(err, 'Error fetching clothes')
    res.status(500).json({ message: 'Internal server error' })
  }
});


router.get('/clothes/:id', (req, res) => {
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



















module.exports = router

