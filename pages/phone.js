const express = require(`express`);
const router = express.Router();
const { db, dbPool } = require(`../database`);

router.get(`/api/v1/phones`, async (req, res) => {
  try {
    const query = `select * from products where productName LIKE '%phone%' or category = 'electronics' order by rand();`;
    const [data] = await dbPool.query(query);

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res
        .status(400)
        .json({ error: `Network Error: Unable to load phones` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Server Error` });
  }
});

router.get(`/api/v1/phone/:id`, async (req, res) => {
  try {
    const phoneID = req.params.id;
    const query = `select * from products where category = 'electronics' and product_id = ?`;

    const [data] = await dbPool.query(query, [phoneID]);

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ error: `Network Error: Unable to load phone details` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Server Error` });
  }
});

module.exports = router;
