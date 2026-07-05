const express = require(`express`)
const router = express.Router()
const {db, dbPool} = require(`../database`);

router.get(`/shoes`, async (req, res)=> {

    try {
        const shoequery = `select * from products where description like '%shoe%' order by rand();`
        const [data] = await dbPool.query(shoequery)
        
        if(data.length > 0){
            // console.log(`Shoe Data is here`);
            return res.status(200).json(data)
            
        }else{
            return res.status(404).json({error: `Error Loading Products`})
        }

        
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: `Database internal Error`,
            errormessage: err.message
        })
    }
    
})
router.get(`/shoes/:id`, async (req, res)=> {
    
    try {

        const productId = req.params.id
        const query = `select * from products where product_id = ? and description like '%shoe%' order by rand()`

        const [data] = await dbPool.query(query, [productId])
        if(data.length > 0){
            return res.status(200).json(data)
            
        }else{
            return res.status(404).json({error: `Internal Error`})

        }
        
    } catch (err) {
        console.error(err)
        return res.status(500).json({error: `Database Error`, errormessage: err.message})
    }

})














module.exports = router