const mongoose = require("mongoose")

const itemsSchema = mongoose.Schema({
    name: {type: String,required: true,trim: true },
    price: {type: Number, required: true, trim: true}
})