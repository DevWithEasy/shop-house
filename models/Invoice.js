const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    buy : {
        type : Number,
        required : true
    },
    sale : {
        type : Number,
        required : true
    },
    products : {
        type : [
            {
                product : {
                    type : mongoose.Types.ObjectId,
                    ref : 'Product'
                },
                quantity : {
                    type : Number,
                },
                buyPrice : {
                    type : Number,
                },
                salePrice : {
                    type : Number,
                }
            }
        ],
        required : true
    },
    
},{timestamps : true})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice