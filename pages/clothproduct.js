const express = require(`express`)
const router = express()
const db = require('../database')




router.get(`/clothes`, (req, res) => {

  const query = `select * from products where category = 'clothing' 
  or category = 'other' order by rand();`

  db.query(`select * from products where category = 'clothing';`, (err, data)=> {
    if(err){
        console.log(err);
        
    }
    console.log(data);
    res.status(200).json(data)
    
  })
});



















module.exports = router

