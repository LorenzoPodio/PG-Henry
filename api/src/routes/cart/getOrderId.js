const { Router } = require ("express");
const getOrderId = Router ();
const { Order, Product, User, Order_detail } = require("../../db")

//getorderid
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
