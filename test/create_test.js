const assert = require("assert")
const User = require("../functions/models/userModel")

const userData = {
    username: "test user",
    email: "testuser@mail.com",
    password: "1234test"
}

describe('Creating user', () => {
    it("creates new user", (done) => {
        const user = new User(userData)
        user.save()
        .then(() => {
            assert(!user.isNew);
            done()

        })
    })
})

describe('Login in User', () => {
    it('logins in a user', (done) => {
        const {email,password} = userData
        console.log(email)
        const registeredUser = User.findByCredentials(email,password)
        assert(registeredUser)
        done()
    })
})