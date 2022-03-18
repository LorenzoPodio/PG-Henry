const { Router } = require("express");
const getAllOrders = Router();
const { Order, Order_detail , Product, User } = require("../../db");

//getallorders
//obtiene todos los carritos de la db incluyendo sus estados, (buying, completed, cancelled)
//y el detalle de la orden con el nombte del usuario que lo adquirio

getAllOrders.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
        where: {
            status: ["completed", "cancelled"]
        },
      include: [{ model: User, attributes: ["name", "email"] }, { model: Order_detail}, {model: Product}],
    });
    const orderId = orders.order;
    // const status = orders.order.dataValues.status;
    // const userName = orders.order.dataValues.user[0].name;
    // const userId = orders.order.dataValues.userId;
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = getAllOrders;
