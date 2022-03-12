const { Router } = require ("express");
const postOrderId = Router ();
const { Order } = require ("../../db")


//postorderid
//

postOrderId.post("/:idUser", async (req, res, next) => {
    try {
      const { name, day, date, time, amount, price } = req.body;
      if (!name || !day || !date || !time || !amount || !price) {
        return res.status(500).send("Necessary parameters not found");
      } else {
        const stateCart = await Order.findOne({
          where: {
            [Op.and]: [
              { userId: req.params.idUser },
              {
                status: {
                  [Op.or]: ["cart", "created"],
                },
              },
            ],
          },
        });
        // console.log(stateCart)
        res.status(200).send(stateCart)
      }
  
      
    } catch (error) {
      next(error);
    }
  });

  module.exports = postOrderId;