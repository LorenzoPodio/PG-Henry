const { Router } = require("express");
const getCartUserId = Router();
const { Order, Product, User, Order_detail } = require("../../db");

getCartUserId.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderId = await User.findByPk(id, {
      include: [
        {
          model: Order,
          include: [
            {
              model: Product,
              attributes: ["name", "date"],
            },
          ],
        },
      ], attributes: ["email", "name", "lastName"]
    });
    if (!orderId) {
      return res
        .status(500)
        .send(`A cart associated with id (${id}) was not found`);
    } else {
      //   console.log(orderId)
      res.status(200).send(orderId);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = getCartUserId;
