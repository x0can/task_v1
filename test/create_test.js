const assert = require("assert")
const chai = require('chai')

const {loginUser,registerUser} =  require("../functions/authentication/user")

const expect = chai.expect;
const chaiHttp = require("chai-http")
chai.use(chaiHttp)
const app = require("../index")

const userData = {
    username: "test user",
    email: "testuser@mail.com",
    password: "1234test",
    role: "merchant"
}

describe('Creating user', () => {
    it("creates new user", (done) => {
       chai.request(app).post("/api/v1/signup", registerUser).send(userData).then(res => {
           expect(res.body.token)
           done()
       }).catch(err => {
           done(err)
       })
        
    })
    
})

describe('Login in User', () => {

    it("logins in a user", (done) => {
        const {email,password} = userData
        const loginCredentials = {email: email, password: password}
        chai.request(app).post("/api/v1/login", loginUser).send(loginCredentials).then(res => {
            // console.log(res)
            expect(res.body.token)
            done()
        }).catch(err => {
            done(err)
        })
    })

})