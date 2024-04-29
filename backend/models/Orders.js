const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    student_id: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },
    order_date: {
        type: Date,
        required: true,
        default: Date.now 
    },
    location: {
        type: String,
        required: true
    },
    
    payment: {
        type: String,
        required: true
    }

   
});

module.exports = mongoose.model('order', OrderSchema)