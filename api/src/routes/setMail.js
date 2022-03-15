const { Router } = require("express");
const transporter = require("../mailer/mailer")
const setMail = Router();
const { Product, Order_detail, Order, User } = require("../db");

// RUTA PARA EL ENVIO DE MAILS A TRAVES DEL COMPONENTE AdminMailer
//Busca todas las excursiones compradas con los datos pasados y envia mail
setMail.post("/", async (req, res, next) => {
  let {name, date, time, content, subject} = req.body;

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
       
     const arrUser =[]
     for (let i = 0; i < orders.length; i++) {
      var users = await Order.findOne({
        where: {
          id: orders[i],
          status: "buying"   //CAMBIAR ESTADO A COMPLETED LUEGO DE PROBAR PARA QUE ENVIE SOLO A LOS COMPRADOS
         }, attributes: ["userId"],
      })
      arrUser.push(users.userId)
       
     }
        
     const arrEmail =[]
     for (let i = 0; i < arrUser.length; i++) {
      var emails = await User.findOne({
        where: {
          id: arrUser[i]
         }, attributes: ["email"],
      })
      arrEmail.push(emails.email)
       
     }

    // const arreee = ["damian_yerien@hotmail.com", "damianyerien83@gmail.com"]


  var mailOptions = {
    from: "excursionappmail@gmail.com",
    to: arrEmail.toString(),
    subject: subject,
    html:content,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.message);
    } else {
      console.log("email enviado")
      res.status(200).jsonp(arrEmail);
    }
   })
});

module.exports = setMail;


