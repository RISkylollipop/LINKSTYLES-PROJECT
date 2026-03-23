const express = require(`express`)
const router = express.Router()
const db = require(`../database`)


router.post(`/contactus`, (req, res) => {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
        console.log(`Missing Field`);

        return res.status(400).json({ error: `Missing Field Required` })
    } else {
        const query = `INSERT into feedbacks set ?`
        const data = { fullname: name, email, feedback: message }

        db.query(query, data, (err, data) => {
            if (err) {
                return res.status(404).json({ error: `Database error try again later` })
            } else {
                res.status(200).json({ message: `Data received and logged` })
            }
        })
    }

})


router.get(`/feedbacks`, (req, res)=>{

    const query = `select id, fullname, email, feedback from feedbacks where status = 'unread'`
    db.query(query, (err, data)=> {
        if(err){
            console.log(`Database Error`,err);
            return res.status(404).json({error: `Database Error, Contact Support`})
            
        }else{
            // console.log(data);
            res.status(200).json(data)
        }
    })
})

router.post(`/readfeedback`, (req, res)=>{

    const id = req.body.id
    // console.log(id);
    
    const query = `update feedbacks set status = 'read' where id = ?`

    db.query(query, [id], (err, data)=> {
        if(err){
            console.log(`Database Error`,err );
            return res.status(500).json({error: `Database Error`})
            
        }
        else{
            res.status(200).json({message: `Feedback read/delete and Updated`})
        }
    })


})





module.exports = router