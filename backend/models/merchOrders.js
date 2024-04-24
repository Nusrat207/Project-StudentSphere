const mongoose = require('mongoose')

const { Schema } = mongoose;

const mOrderSchema = new Schema({
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
        default: Date.now // Set the default value to the current date and time
    },

   
});

module.exports = mongoose.model('orderMerch', mOrderSchema)