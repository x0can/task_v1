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
const {addItem}= require("./functions/shop_files/items")

// test function for the middleware

// routes
app.post("/api/v1/signup", registerUser)
app.post("/api/v1/login", loginUser)



// test route for the middleware
app.post("/api/v1/item", AuthMidd, addItem)




const PORT = process.env.PORT || 8080;
app.listen(PORT,()=> console.log(`\n running \n mode: ${process.env.NODE_ENV} \n on: http://localhost:${PORT}`))

module.exports =app