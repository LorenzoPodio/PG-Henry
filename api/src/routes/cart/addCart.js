const { Router } = require ("express");
const addCart = Router();
const { Op } = require("sequelize")
const { Order, Order_detail, Product } = require("../../db")

addCart.post("/", async (req, res, next) =>{
    try {
        const { name, date, time, quantity, price ,id } = req.body;
        if (!name || !date || !time || !quantity || !price) {
          return res.status(500).send("Necessary parameters not found");
        } else {
          const stateCart = await Order.findOne({
            where: {
              [Op.and]: [
                { userId: id },
                {
                  status: {
                    [Op.or]: ["empty", "buying"],
                  },
                },
              ],
            },
          });
            // console.log(stateCart,'esto rompee')
            if (stateCart.dataValues.status === "empty"){
              stateCart.dataValues.status = "buying";
            }
        await Order.update({
            status: "buying"
        },{
            where:{
                userId: stateCart.dataValues.userId
            }
        })
            // console.log(hola,'queondddddaa')
        const product = await Product.findOne({
            where: {
                name: name,
                date: date,
                time: time,
                price: price
            }
        })

        const productInCart = await Order_detail.create({
           price: price,
           quantity: quantity,
           productId: product.dataValues.id,
           orderId: stateCart.dataValues.id
        })
        //   console.log(productInCart,'prrroodod')
        //   let state = "buying";
        //   console.log( stateCart.dataValues.status,'cambiado?')

        //   const orderDetail = await Order_detail.findOrCreate({
            
        //   })
        const cartAmount = await Order_detail.findAll({
            where: {
                orderId: stateCart.dataValues.id
            }
            
       })
          res.status(200).send([`${cartAmount.length}`,productInCart ])
        }
    
        
      } catch (error) {
        next(error);
      }
})

module.exports = addCart;