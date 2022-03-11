const { Router } = require("express");
const substractCart = Router();
const { Op } = require("sequelize")
const { Order, Order_detail, Product } = require("../../db")

substractCart.put("/", async (req, res, next) => {
    try {
        const { name, date, time, quantity, price, id } = req.body;
        if (!name || !date || !time || !quantity || !price) {
            return res.status(500).send("Necessary parameters not found");
        } else {
            const stateCart = await Order.findOne({
                where: {
                   userId: id,
                   status: "buying"
                }, attributes: ["status", "id"],
            });
            
            const product = await Product.findOne({
                where: {
                    name: name,
                    date: date,
                    time: time,
                    price: price
                }, attributes: ["id"]
            })
            // console.log(product, 'queoondaaaa')
            // console.log(stateCart, 'ESTEE STATE CARTTTTTE')
            const destroy = await Order_detail.destroy({
                where: {
                    productId: product.dataValues.id,
                    orderId: stateCart.dataValues.id
                },
            });
            const detailState = await Order_detail.findAll({
                where: {
                    orderId: stateCart.dataValues.id
                }
            })
            // console.log(detailState,'esteeeeeeeeeeee')
            if (detailState.length === 0) {
                await Order.update({
                    status: "empty"
                }, {
                    where: {
                        userId: id
                    }
                })
            }
            res.status(200).send(`${detailState.length}`)
        }
    } catch (error) {
        next(error);
    }
})

module.exports = substractCart;