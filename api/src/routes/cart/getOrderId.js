const { Router } = require("express");
const getOrderId = Router();
const { Order, Product, User, Order_detail } = require("../../db");

//getorderid
//obtenemos el carrito por id con el usuario correspondiente con su nombre
//incluyendo el precio del mismo y la cantidad adquirida del producto
//si no lo encuentra retorna not found

getOrderId.get("/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    if (!email) {
      res.status(202).send("Email required");
    }
    const getUserId = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["id"],
    });

    const userCart = await Order.findOne({
      where: {
        userId: getUserId?.dataValues.id,
        status: ["buying", "empty", "processingPay"]
      },
    });
    const userCartWithItems = await Order_detail.findAll({
      where: {
        orderId: userCart?.dataValues.id,
      },
      include: [{ model: Product }],
    });

    return res.status(200).json(userCartWithItems);
  } catch (error) {
    next(error);
  }
});

module.exports = getOrderId;
