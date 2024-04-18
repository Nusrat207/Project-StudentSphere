const mongoose = require('mongoose')

const { Schema } = mongoose;

const user_info = new Schema({
    name:{
        type:String,
        required:true
    },
    student_id:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('user_info', user_info)