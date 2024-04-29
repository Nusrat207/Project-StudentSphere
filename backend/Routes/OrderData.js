const express = require('express')
const router = express.Router()
const Order = require('../models/Orders');

/*
router.post('/OrderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{order_date:req.body.order_date})

    //console.log("1231242343242354",req.body.student_id, req.body.order_date)

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
}) */
router.post('/OrderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        const order_date = req.body.order_date;
        const location = req.body.location;
        const payment = req.body.payment; 

        const newOrder = {
            student_id: req.body.student_id,
            order_data: data,
            order_date: order_date,
            location: location, 
            payment: payment 
        };

        let existingOrder = await Order.findOne({ student_id: req.body.student_id });

        if (!existingOrder) {
            await Order.create(newOrder);
        } else {
            existingOrder.order_data.push(...data); 
            existingOrder.order_date = order_date; 
            existingOrder.location = location; 
            existingOrder.payment = payment; 
            await existingOrder.save(); 
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Server Error", error.message);
    }
});

module.exports = router;