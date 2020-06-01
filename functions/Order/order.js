const Order = require("../models/orderModel");
const Items = require("../models/itemsModel");

exports.addOrder = async (req, res) => {
  try {
    const itemBought = await Items.findById(req.params.itemId).then((item) => {
      item.quantity = 1;
      return item;
    });

    Order.findOne({ user_id: req.user._id })
      .then(async (response) => {
        if (response && response !== null && response.items.length > 0) {
          await Order.updateOne(
            { _id: `${response._id}`, "items._id": itemBought._id },
            { $inc: { "items.$.quantity": 1 } }
          )
            .then(async (data) => {
              const { nModified } = data;
              if (nModified === 1) {
                Order.findOne({ user_id: req.user._id })
                  .then(async (orderDetails) => {
                    let costOrder = [];
                    orderDetails.items.map((new_map_order) => {
                      costOrder.push(
                        new_map_order.quantity * new_map_order.price
                      );
                    });
                    const cost_order = costOrder.reduce((a, b) => {
                      return a + b;
                    }, 0);
                    orderDetails.amount = cost_order;

                    return res.status(200).json(orderDetails);
                  })
                  .catch((err) => {
                    console.error(err);
                    return res
                      .status(500)
                      .json({ general: "Something went wrong" });
                  });
              } else {
                const newOrder = new Order();
                newOrder.user_id = req.user._id;
                await newOrder.save();
                await Order.findOne({ user_id: newOrder.user_id })
                  .then((new_order) => {
                    new_order.items.push(itemBought);

                    let costOrder = [];
                    new_order.items.map((new_map_order) => {
                      costOrder.push(
                        new_map_order.quantity * new_map_order.price
                      );
                    });
                    const cost_order = costOrder.reduce((a, b) => {
                      return a + b;
                    }, 0);
                    new_order.amount = cost_order;
                    new_order.save();
                    return res.status(200).json(new_order);
                  })
                  .catch((err) => {
                    console.error(err);
                    return res
                      .status(500)
                      .json({ general: "Something went wrong" });
                  });
              }
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ general: "Something went wrong" });
            });
        } else {
          const newOrder = new Order();
          newOrder.user_id = req.user._id;
          await newOrder.save();
          await Order.findOne({ user_id: newOrder.user_id })
            .then((new_order) => {
              new_order.items.push(itemBought);
              let costOrder = [];
              new_order.items.map((new_map_order) => {
                costOrder.push(new_map_order.quantity * new_map_order.price);
              });
              const cost_order = costOrder.reduce((a, b) => {
                return a + b;
              }, 0);
              new_order.amount = cost_order;
              new_order.save();
              return res.status(200).json(new_order);
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({
                general: "Item you are trying to order does not exist",
              });
            });
        }
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

exports.getOrder = async (req, res) => {
  try {
    await Order.findOne({ user_id: req.user._id })
      .then((response) => {
        let amount = [];
        response.items.filter((item) => {
          amount.push(item.quantity * item.price);
        });
        let sum = amount.reduce((a, b) => {
          return a + b;
        }, 0);
        response.amount = sum;
        response.save();
        return res.status(200).json(response);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ general: "Something went wrong" });
      });
  } catch (error) {
    console.error(error);
  }
};



exports.deleteOrder = async (req, res) => {
  try {
    const itemBought = await Items.findById(req.params.itemId).then((item) => {
      item.quantity = 1;
      return item;
    });
    Order.findOne({ user_id: req.user._id })
      .then(async (response) => {
        await Order.updateOne(
          { _id: `${response._id}`, "items._id": itemBought._id },
          { $inc: { "items.$.quantity": -1 } }
        )
          .then(async (data) => {
            const { nModified } = data;
            if (nModified === 1) {
              Order.findOne({ user_id: req.user._id })
                .then(async (orderDetails) => {
                  let newOrder = [];

                  orderDetails.items.map((item) => {
                    if (item.quantity >= 1) {
                      newOrder.push(item);
                    }
                  });

                  await orderDetails.set({ items: newOrder }).save();

                  let costOrder = [];

                  orderDetails.items.filter((item) => {
                    costOrder.push(item.quantity * item.price);
                  });

                  const cost_order = costOrder.reduce((a, b) => {
                    return a + b;
                  }, 0);

                  orderDetails.amount = cost_order;

                  await orderDetails.save();
                  return res.status(200).json(orderDetails);
                })
                .catch((err) => {
                  console.error(err);
                  return res
                    .status(500)
                    .json({ general: "Something went wrong" });
                });
            } else {
              return res.status(500).json({ general: "Item not orderd" });
            }
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ general: "Something went wrong" });
          });
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
