exports.testData = (req,res) => {




    
    console.log(req.user)
    return res.status(201).json({success: true})
}