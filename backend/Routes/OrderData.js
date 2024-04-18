const express = require('express')
const router = express.Router()
const order = require('../models/Orders');

router.post('/OrderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{order_date:req.body.order_date})

    //console.log("1231242343242354",req.body.student_id, req.body.order_date)

    //if email not exisitng in db then create: else: InsertMany()
    let sID = await order.findOne({ 'student_id': req.body.student_id })    
    console.log(sID)
    if (sID===null) {
        try {
            console.log(data)
            //console.log("1231242343242354",req.body.email)
            await order.create({
                student_id: req.body.student_id,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }
    else {
        try {
            await order.findOneAndUpdate({student_id:req.body.student_id},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

module.exports = router;