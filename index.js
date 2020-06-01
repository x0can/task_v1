const express = require('express')
const {connectDB} = require("./functions/config/admin")
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
const {addItem, getItems}= require("./functions/Items/items")
const {addOrder,deleteOrder,getOrder}  = require("./functions/Order/order")

// routes
app.post("/api/v1/signup", registerUser)
app.post("/api/v1/login", loginUser)

//   add and get items
app.route("/api/v1/order/:itemId")
.post( AuthMidd, addOrder)
.delete( AuthMidd, deleteOrder)

app.get("/api/v1/order", AuthMidd, getOrder )

app.route("/api/v1/item")
.post(AuthMidd,addItem)
.get(AuthMidd,getItems)


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=> console.log(`\n running \n mode: ${process.env.NODE_ENV} \n on: http://localhost:${PORT}`))

module.exports =app