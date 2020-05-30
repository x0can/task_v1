const User = require('../models/userModel')
const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    let idToken
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        idToken= req.headers.authorization.split("Bearer ")[1]        

    }else{
        console.error('No token found')
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(idToken, process.env.JWT_KEY)
    const {id, iat} = decoded

    User.findById(id).then(user=> {
    req.user = user    
    return next()
    }).catch(err=> {
        console.error(err)
    })
    



}

