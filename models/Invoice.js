const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    buyPrice : {
        type : Number,
        required : true
    },
    salePrice : {
        type : Number,
        required : true
    },
    products : {
        type : Array,
        required : true
    },
    
},{timestamps : true})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice