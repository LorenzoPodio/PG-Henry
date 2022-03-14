const { Router } = require ("express");
const addCart = Router();
const { Op } = require("sequelize")
const { Order, Order_detail, Product, Excursion } = require("../../db")

//ruta que requiere los mismos datos del producto cargado en la ruta selectProduct
//para hacer la carga del mismo en el carrito en la db con el id del usuario
//correspondiente
//retorna el numero de productos que hay dentro del carrito, el precio y la cantidad 

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
        
        const product = await Product.findOne({
            where: {
                name: name,
                date: date,
                time: time,
                price: price
            } 
        })
        const excursion = await Excursion.findOne({
          
          where:{name :{[Op.iLike]: product.name.id}} ,
      })
        const productInCart = await Order_detail.create({
           price: price,
           quantity: quantity,
           productId: product.dataValues.id,
           orderId: stateCart.dataValues.id,
           totalPrice: price * quantity
        })
        
        const cartAmount = await Order_detail.findAll({
            where: {
                orderId: stateCart.dataValues.id

            }, include: [{ model: Product }] 
           ,
           
       })
       
          res.status(200).send(cartAmount )
        }
    
        
      } catch (error) {
        next(error);
      }
})

module.exports = addCart;