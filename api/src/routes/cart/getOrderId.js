const { Router } = require ("express");
const getOrderId = Router ();
const { Order, Product, User, Order_detail } = require("../../db")

//getorderid
//obtenemos el carrito por id con el usuario correspondiente con su nombre
//incluyendo el precio del mismo y la cantidad adquirida del producto
//si no lo encuentra retorna not found

getOrderId.get("/:id", async (req, res, next) => {
    try {
      const { id } =req.params
      const orderId = await Order.findByPk(id, {
        include: [
          { model: User , attributes : ["name"] },
          {
            model: Product, attributes: ["name","date"],
            include: [{ model: Order_detail, attributes: ["price","quantity"] }],
          },
        ],
      });
      if (!orderId){
        return res.status(500).send(`Cart ${id} was not found`)
    }
    else{
    //   console.log(orderId)
      res.status(200).send(orderId)}
    } catch (error) {
      next(error);
    }
  });
  

module.exports = getOrderId;
