const { Router } = require("express");
const substractCart = Router();
const { Op } = require("sequelize")
const { Order, Order_detail, Product } = require("../../db")

//ruta que requiere los mismos datos del producto agregado en el carrito
//para poder eliminarlo y retorna la cantidad de productos que hay en el carrito
//actualmente

substractCart.put("/", async (req, res, next) => {
    try {
        const { detailId, orderId } = req.body;
        if (!detailId || !orderId ) {
            return res.status(500).send("Necessary parameters not found");
        } else {
           
            
            const order = await Order_detail.findAll({
                where: {
                    orderId: orderId
    
                }
            })
          
            const destroy = await Order_detail.destroy({
                where: {
                   
                    detailId: detailId
                },
            });
           
            const cartAmount = await Order_detail.findAll({
                where: {
                    orderId: orderId
    
                }, include: [{ model: Product }]                
           })
            
            if (cartAmount.length === 0) {
                await Order.update({
                    status: "empty"
                }, {
                    where: {
                       id: order[0].orderId
                    }
                })
            }
       
            res.status(200).send(cartAmount)
        }
    } catch (error) {
        next(error);
    }
})

module.exports = substractCart;