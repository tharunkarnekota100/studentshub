const mongoose = require('mongoose')

const team = new mongoose.Schema({
    
    name :{
        type : string,
        required : True
    },
    clgid :{
        type : string,
        required : true,
    },
    position :{
        type : string,
        required : true,
    },
    mobile :{
        type : string,
        required : true,
    },
    email :{
        type : string,
        required : true,
    }
})

module.exports = mongoose.model('Support Team BME',team)
