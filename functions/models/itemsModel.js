const mongoose = require("mongoose");
const User = require("./userModel");

const itemsSchema = mongoose.Schema({
  name: { 
    type: String,
     required: true,
      trim: true 
    },
  price: { 
    type: Number,
     required: true,
      trim: true 
    },
  userId: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number
   },
})



const Items = mongoose.model("Items", itemsSchema);

module.exports = Items
