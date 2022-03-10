const { Router } = require("express");
const createOrder = Router();
const { Order, User } = require("../../db.js");

//Ruta busca que el usuario tenga un carrito asociado con estado "buying", si lo tiene
//lo devuelve, sino le crea uno asociado al id en estado "empty"
//RUTA PARA LOGIN DE USERS FUTURA

//orderpost
createOrder.post("/", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).send("Email required");
    }
    const getUserId = await User.findOne({
      where: {
       email: email
      }, attributes: ["id"],
    });
    // console.log(getUserId.dataValues.id,'getuseridd')
    const OrderStatusCreated = await Order.findOne({
      where: {
        userId: getUserId.dataValues.id,
        status: "buying",
      },
    });

    const OrderStatusCart = await Order.findOrCreate({
      where: {
        userId: getUserId.dataValues.id,
        status: "empty",
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
