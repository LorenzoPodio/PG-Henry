const { Router } = require("express");
const getAllOrders = Router();
const { Order, Order_detail , User } = require("../../db");

//getallorders
getAllOrders.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User, attributes: ["name"] }, { model: Order_detail }],
    });
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = getAllOrders;
