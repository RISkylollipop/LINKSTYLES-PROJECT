const express = require(`express`)
const router = express.Router()
const db = require(`../database`)

router.get(`/shoes`, (req, res)=> {
   
    const query = `select * from products where description like '%shoe%' order by rand();`
    
    db.query(query, (err, data)=> {
        if (err) {
           console.log(`Database Error for Shoe`, err);
            
        }

        // console.log(data);
        res.status(200).json(data)

    })

})
router.get(`/shoes/:id`, (req, res)=> {
    
    productId = req.params.id

    const query = `select * from products where product_id = ? and description like '%shoe%' order by rand()`
    
    db.query(query,[productId], (err, data)=> {
        if (err) {
           console.log(`Database Error for Shoe`, err);
            
        }

        // console.log(data);
       return res.status(200).json(data)

    })

})














module.exports = router