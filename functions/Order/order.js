const Order = require("../models/orderModel");
const Items = require("../models/itemsModel");
exports.addOrder = async (req, res) => {
  try {
    const itemBought = await Items.findById(req.params.itemId).then((item) => {
      return item;
    });

    Order.findOne({ user_id: req.user._id })

      .then(async (response) => {
        if (response && response !== null && response.items.length > 0) {
          await Order.update(
            { _id: `${response._id}`, "items._id": itemBought._id },
            { $inc: { "items.$.quantity": 1 } }
          )

            .then(async (data) => {
              const { nModified } = data;

              if (nModified === 1) {
                Order.findOne({ user_id: req.user._id })
                  .then(async (orderDetails) => {
                    return res.status(200).json(orderDetails);
                  })
                  .catch((err) => console.error(err));
              } else {
                const newOrder = new Order();
                newOrder.user_id = req.user._id;
                await newOrder.save();
                await Order.findOne({ user_id: newOrder.user_id })
                  .then((new_order) => {
                    new_order.items.push(itemBought);
                    new_order.save();
                    return res.status(200).json(new_order);
                  })
                  .catch((err) => console.error(err));
              }
            })
            .catch((err) => console.error(err));
        } else {
          const newOrder = new Order();
          newOrder.user_id = req.user._id;
          await newOrder.save();
          await Order.findOne({ user_id: newOrder.user_id })
            .then((new_order) => {
              new_order.items.push(itemBought);
              new_order.save();
              return res.status(200).json(new_order);
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ general: "Something went wrong" });
  }
};
