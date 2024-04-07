const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    address : {
        type : String,
    }
},{timestamps : true})

const User = mongoose.model('User', userSchema)

module.exports = User