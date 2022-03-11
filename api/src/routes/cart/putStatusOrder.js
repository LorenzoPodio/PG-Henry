const { Router } = require("express");
const putStatusOrder = Router ();
const { User , Order, Order_detail , Product } = require("../../db");

putStatusOrder.put("/:id", async (req, res, next) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        
            // const cancelOrder =await User.findByPk(id, {
            //     include: [
            //       {
            //         model: Order,
            //         include: [
            //           {
            //             model: Product,
            //             attributes: ["name", "date"],
            //           },
            //         ],
            //       },
            //     ], attributes: ["email", "name", "lastName"]
            //   });
            //   let email = cancelOrder.email
            //   let name = cancelOrder.name
            //   let lastName = cancelOrder.lastName
            //   let stateOrder = cancelOrder.orders[0].status
            //   let products = cancelOrder.orders[0].products.map(or => {
            //         console.log(or.order_detail.dataValues.productId,'AHORAAAAAAAAA')
            //   })
            //   console.log(email, name, lastName,products,stateOrder,'a ver que onda con estooo')
            //   console.log(cancelOrder, 'a ver que me trajoooo')
            // return res.status(200).send({cancelOrder})
            const orderId = await Order.findByPk(id,{

            })

      
    } catch (error) {
        next(error)
    }
})

module.exports = putStatusOrder;