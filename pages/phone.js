const express = require(`express`);
const router = express.Router();
const {db, dbPool} = require(`../database`)





router.get(`/api/v1/phones`, (req, res) => {
  console.log(req.body);

  const query = `select * from products where productName LIKE '%phone%' or category = 'electronics' order by rand();`

  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});


router.get(`/api/v1/phone/:id`, (req, res) => {
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





module.exports = router