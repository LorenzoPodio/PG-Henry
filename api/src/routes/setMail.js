const { Router } = require("express");
const transporter = require("../mailer/mailer")
const setMail = Router();
const { Product, Order_detail, order, user } = require("../db");


setMail.post("/", async (req, res, next) => {
  let {name, date, time, text} = req.body;

  const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
  const newProduct = await Product.findAll({
    where: {
        name: nameUpper,
        date: date,
        time: time
    }
  })
    const ordersDetail = await Order_detail.findAll({
      where: {
          productId: newProduct[0].id
      },
    
 })


      const orders = ordersDetail.map(e => e.orderId)

     
        
        

  // var mailOptions = {
  //   from,
  //   to,
  //   subject,
  //   text,
  //   html,
  // }

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return res.status(500).send(error.message);
  //   } else {
  //     console.log("email enviado")
      res.status(200).jsonp(orders);
  //   }
  // })
});

module.exports = setMail;


// DEJO ACA EL JSON QUE DEBERIA VENIR EN EL BODY
// {
//   "from": "excursionappmail@gmail.com",
//     "to": "SARAZA@hotmail.com",
//     "subject": "prueba",
//     "text": "hola mundo",
//     "html": "<h1>otra prueba</h1>"
// }
