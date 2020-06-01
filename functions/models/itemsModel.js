const mongoose = require("mongoose");
const User = require("./userModel");

const ItemsSchema = mongoose.Schema({
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
  quantity: {
    type: Number,
  }
  
})



const Items = mongoose.model("Items", ItemsSchema);

module.exports = Items
