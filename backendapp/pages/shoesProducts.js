const express = require(`express`)
const router = express.Router()
const db = require(`../database`)

router.get(`/shoes`, (req, res)=> {
    console.log(req.body);

    const query = `select * from products where description like "%shoe%";`
    
    db.query(query, (err, data)=> {
        if (err) {
           console.log(`Database Error for Shoe`, err);
            
        }

        res.status(200).json(data)

    })

})














module.exports = router