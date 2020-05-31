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

// OrderSchema.statics.addOrder = async function(itemId) {
//     const order = this  
//     const itemData =  await Items.findById(itemId).then(item=> {
//         if(!item){
//             throw new Error({error: "Item not found"})
//         }
//         return item    
//     })

//     order.find({}).populate(`${itemData}`).exec((err, items) => {
//         if(err){
//             console.log(err)
//             throw Error({error: err})
//         }

       

//         items.forEach(newItem=> {
//             newItem.itemData.forEach(orderItem => {
//                 if(new String(orderItem._id).valueOf() !== new String(itemId).valueOf()){
                    
//                 }
//             })
//         })
//     })

 
    // order.itemData.push(item)

    // return order    
    
// }

const Order = mongoose.model("Order", OrderSchema)
module.exports = Order