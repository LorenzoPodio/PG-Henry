const { Router } = require("express");
const getCartUserId = Router();
const { Order, Product, User, Order_detail } = require("../../db");

//ruta que pide por params el id del usuario para retornar su carrito
//con los productos dentro del mismo con el nombre y la fecha del mismo
//ACTUALMENTE NO SE USA PARA NADA JEJE
getCartUserId.get("/", async (req, res, next) => {
  try {
    const { email, status } = req.query;

    if (email && status) {
      const getUserId = await User.findOne({
        where: {
          email: email,
        },
        attributes: ["id"],
      });


      const ordersByStatus = await Order.findAll({
        where:{
          userId: getUserId?.dataValues.id,
          status: ["completed", "cancelled"]
        },
        include:[{model: Order_detail}, {model: Product}]
      });

      if(status === "completed"){
        const ordersCompleted = ordersByStatus?.filter((e)=> e.status === "completed")
        return res.status(200).json(ordersCompleted)
      }
      if(status === "cancelled"){
        const ordersCancelled = ordersByStatus?.filter((e)=> e.status === "cancelled")
        return res.status(200).json(ordersCancelled)
      }

      return res.status(200).json(ordersByStatus)

      // if(status === "completed") {
      //   ordersByStatus?.map((e)=>{})
      // }
    }
    // const orderId = await User.findByPk(id, {
    //   include: [
    //     {
    //       model: Order,
    //       include: [
    //         {
    //           model: Product,
    //           attributes: ["name", "date"],
    //         },
    //       ],
    //     },
    //   ],
    //   attributes: ["email", "name", "lastName"],
    // });
    // if (!orderId) {
    //   return res
    //     .status(500)
    //     .send(`A cart associated with id (${id}) was not found`);
    // } else {
    //   res.status(200).send(orderId);
    // }
  } catch (error) {
    next(error);
  }
});

module.exports = getCartUserId;
