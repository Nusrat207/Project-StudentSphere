const express = require('express')
const router = express.Router()

router.post('/MerchData', (req,res)=>{
    try{
        //console.log(global.food_items);
        res.send([global.MerchData]);
    }
    catch(error){
        console.log(error);
        res.send("Server error");
    }
})

module.exports = router;