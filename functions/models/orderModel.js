const mongoose = require("mongoose")
const Users = require('./userModel')
const Items = require('./itemsModel')

const OrderSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true
    },

    items: [],
    amount: {
        type: Number
    }

   
})

const Order = mongoose.model("Order", OrderSchema)
module.exports = Order