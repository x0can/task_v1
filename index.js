const express = require('express')
const {connectDB} = require("./config/admin")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config({path: './.env'})

// db initialization
connectDB();

// initialize server 
const app =express()
app.use(express.json())

// custom functions
const {registerUser,loginUser} = require("./authentication/user")
const AuthMidd = require("./middleware/allAuth")


// test function for the middleware
const {testData} = require("./data/data")

// routes
app.post("/api/v1/signup", registerUser)
app.post("/api/v1/login", loginUser)

// test route for the middleware
app.post("/api/v1/test", AuthMidd, testData)




const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`\n running \n mode: ${process.env.NODE_ENV} \n on: http://localhost:${PORT}`))