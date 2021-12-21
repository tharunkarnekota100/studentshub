const mongoose = require('mongoose')

const review = new mongoose.Schema({
    
    messageSender :{
        type : String,
        required : true
    },
    messageReceiver :{
        type : String,
        required : true,
    },
    message :{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('reviews',review)