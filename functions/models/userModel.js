
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"Is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Is required"],
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },

    role: {
        type: String,
        required: true,
    }
   
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({id: user._id}, process.env.JWT_KEY)
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {

    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {

        throw new Error({ email: `${email} already taken` })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new Error({ password: "Invalid password" })
    }
    return user
}




const User = mongoose.model('User', userSchema)

module.exports = User
