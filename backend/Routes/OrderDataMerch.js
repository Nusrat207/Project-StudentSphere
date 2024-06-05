const express = require('express')
const router = express.Router()
const order = require('../models/merchOrders');

router.post('/OrderDataMerch', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{order_date:req.body.order_date})

    let sID = await order.findOne({ 'student_id': req.body.student_id })    
    console.log(sID)
    if (sID===null) {
        try {
            //console.log(data)
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

router.post('/myMerchOrder', async (req, res) => {
    try {
        //console.log(req.body.student_id)
        let sId = await order.findOne({ 'student_id': req.body.student_id })
        //console.log(sId)
        res.json({orderData:sId})
    } catch (error) {
        res.send("Error",error.message)
    }
});


module.exports = router;