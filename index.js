const express = require('express')
const {connectDB} = require("./functions/config/admin")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config({path: './.env'})

// db initialization
connectDB();

// initialize server 
const app =express()
app.use(express.json())

// custom functions
const {registerUser,loginUser} = require("./functions/authentication/user")
const AuthMidd = require("./functions/middleware/allAuth")
const {addItem, getItems}= require("./functions/shop_files/items")


// routes
app.post("/api/v1/signup", registerUser)
app.post("/api/v1/login", loginUser)

//   add and get items
app.route("/api/v1/item")
.post(AuthMidd,addItem)
.get(AuthMidd,getItems)


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=> console.log(`\n running \n mode: ${process.env.NODE_ENV} \n on: http://localhost:${PORT}`))

module.exports =app