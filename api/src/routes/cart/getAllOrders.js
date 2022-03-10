const { Router } = require("express");
const getAllOrders = Router();
const { Order } = require("../../db")

//getallorders
getAllOrders.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = getAllOrders;
