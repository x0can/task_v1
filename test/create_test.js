const assert = require("assert");
const chai = require("chai");
const jwt = require("jsonwebtoken");

const { loginUser, registerUser } = require("../functions/authentication/user");
const { addItem } = require("../functions/shop_files/items");
const CustomMid = require("../functions/middleware/allAuth");

const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../index");

const userData = {
  username: "test user2",
  email: "testuser@mail.com",
  password: "1234test",
  role: "merchant",
};

const User = require("../functions/models/userModel");

describe('Creating user', () => {
    it("creates new user", (done) => {
       chai.request(app).post("/api/v1/signup", registerUser).send(userData).then(res => {
           expect(res).to.have.status(200)
           done()
       }).catch(err => {
           done(err)
       })

    })

})

describe("Login in User", () => {
  it("logins in a user", (done) => {
    const { email, password } = userData;
    const loginCredentials = { email: email, password: password };
    chai
      .request(app)
      .post("/api/v1/login", loginUser)
      .send(loginCredentials)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        assert(res.body.data && res.body.token);
          done();
      });
  });
});

const itemData = {
  name: "toy",
  price: 200,
};

// const userId = id
describe("Creating an item", () => {
  it("creates a new item", async () => {
    try {
      const { email, password } = userData;
      const user = await User.findByCredentials(email, password);

      const token = await user.generateAuthToken();
      const authHeader = `Bearer ${token}`;
      chai
        .request(app)
        .post(`/api/v1/item/`, CustomMid, addItem)
        .set("authorization", `${authHeader}`)
        .send(itemData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          assert(res.body.item && res.body.user);
          //   done();
        });
    } catch (error) {
      console.error(error);
    }
  });
});
