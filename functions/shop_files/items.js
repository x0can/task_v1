const Items = require("../models/itemsModel");
const User = require("../models/userModel");

exports.addItem = async (req, res) => {
  const { price, name } = req.body;
  let data = {};
  try {
    let itemData = Items({
      name: req.body.name,
      price: req.body.price,
      userId: req.user._id,
    });

    itemData.save();

    await User.findById(req.user._id)
      .then((userResponse) => {
        data.item = itemData;
        data.user = userResponse;
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ general: "Something went wrong" });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ general: "Something went wrong" });
  }
};

exports.getItems = async (req, res) => {
  let itemsData = [];
  await Items.find()
    .then((item) => {
      itemsData.push(item);
      return res.status(200).json(itemsData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ general: "Something went wrong" });
    });
};
