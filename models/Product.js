const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    brand : {
        type : mongoose.Types.ObjectId,
        ref : 'Brand'
    },
    model : {
        type : String,
    },
    size : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        default : 0
    },
    barCode : {
        type : String,
        required : true
    }

},{timestamps : true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product