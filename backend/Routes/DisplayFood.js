const express = require('express')
const router = express.Router()

router.post('/foodData', (req,res)=>{
    try{
        //console.log(global.food_items);
        res.send([global.food_items, global.mealtype]);
    }
    catch(error){
        console.log(error);
        res.send("Server error");
    }
})

module.exports = router;