const mongoose = require('mongoose')

const users = new mongoose.Schema({
    fullname :{
        type : String,
        required : true
    },
    collegeId :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    branch :{
        type : String,
        required : true
    },
    mobile :{
        type : String,
        required : true,
    },
    github :{
        type : String,
        required : true,
    },
    linkedin :{
        type : String,
        required : true,
    },
    skill :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    confirmpassword :{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('users',users)




