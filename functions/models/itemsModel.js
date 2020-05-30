const mongoose = require("mongoose");
const User = require("./userModel");

const itemsSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  userId: { type: String, required: true },
  amount: { type: Number },
});

// itemsSchema.pre("save", async (next) => {
//     const itemData = this
//     const userData = User.findById(user.userId).then(user => {
//         itemData.user = user
//     })
//     next()

// })

itemsSchema.methods.addAmount = async (amount) => {
  const item = this;
  item.amount = amount;
  item.update(amount);
  return amount;
};

itemsSchema.methods.getUserDetails = async (userId) => {
  const item = this;
  const userData = User.findById(userId)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = mongoose.model("Items", itemsSchema);
