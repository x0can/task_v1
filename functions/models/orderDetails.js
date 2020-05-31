const mongooose = require("mongoose")

const orderSchema = mongooose.Schema({
    user_id: {
        type: String,
        required: true
    },
    items_bought: {
        type: Array,
        "item": []
    }
})


userSchema.pre('save', ay)


const Order = mongooose.model('Order', orderSchema)
module.exports = Order