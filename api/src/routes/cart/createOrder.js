const { Router } = require("express");
const createOrder = Router();
const { Order } = require("../../db.js");

// Esto tiene que venir cuando agrega al carrito

//orderpost
createOrder.post("/", async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).send("Faltan datos jeje");
    }
    const OrderStatusCreated = await Order.findOne({
      where: {
        userId: id,
        status: "created",
      },
    });
    const OrderStatusCart = await Order.findOrCreate({
      where: {
        userId: id,
        status: "cart",
      },
    });
    if (!OrderStatusCreated) {
      return res.status(200).send(OrderStatusCart);
    } else {
      return res.status(201).send(OrderStatusCreated);
    }
  } catch (error) {
    next(error);
  }
});


module.exports = createOrder;
