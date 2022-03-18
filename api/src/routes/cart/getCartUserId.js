const { Router } = require("express");
const getCartUserId = Router();
const { Order, Product, User, Order_detail } = require("../../db");


//ruta que pide por params el id del usuario para retornar su carrito
//con los productos dentro del mismo con el nombre y la fecha del mismo
//ACTUALMENTE NO SE USA PARA NADA JEJE
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
      res.status(200).send(orderId);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = getCartUserId;
