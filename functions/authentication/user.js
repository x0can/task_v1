const User = require("../models/userModel");



exports.registerUser =(async (req, res) => {

  try {
    const user = new User(req.body);

    await user.save()

    const token = await user.generateAuthToken();
    return res.status(200).json({
      data: user,
      token,
    });

  } catch (error) {
    // console.error(error);
    if (error.name === "MongoError")
      return res
        .status(400)
        .json({ email: `${req.body.email} already in use`});
    return res.status(500).json({ general: "Something went wrong" });
  }
});

exports.loginUser = (async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await  User.findByCredentials(email, password)
        if(!user){
            return res.status(400).json({error: "Account does not exist" })
        }
        const token = await user.generateAuthToken()
        return res.status(200).json({
            data: user,
            token
        })
    }
    catch (error) {
        // console.error(error)
        return res.status(500).json({ general: "Something went wrong" });
      }

})

