const { Router } = require("express");
const transporter = require("../mailer/mailer");
const setMail = Router();
const { Product, Order_detail, Order, User } = require("../db");

// RUTA PARA EL ENVIO DE MAILS A TRAVES DEL COMPONENTE AdminMailer
//Busca todas las excursiones compradas con los datos pasados y envia mail
setMail.post("/", async (req, res, next) => {
  try {
    let { name, date, time, content, subject } = req.body;

    const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
    const newProduct = await Product.findAll({
      where: {
        name: nameUpper,
        date: date,
        time: time,
      },
    });

    const product = newProduct[0].name;
    const dates = newProduct[0].date.substring(1,11);
    const schedule = newProduct[0].time;

    const ordersDetail = await Order_detail.findAll({
      where: {
        productId: newProduct[0].id,
      },
    });

    const orders = ordersDetail.map((e) => e.orderId);

    const arrUser = [];
    for (let i = 0; i < orders.length; i++) {
      var users = await Order.findOne({
        where: {
          id: orders[i],
          status: "completed", //CAMBIAR ESTADO A "buying" PARA PROBAR RUTA
        },
        attributes: ["userId"],
      });
      arrUser.push(users.userId);
    }

    const arrEmail = [];
    for (let i = 0; i < arrUser.length; i++) {
      var emails = await User.findOne({
        where: {
          id: arrUser[i],
        },
        attributes: ["email"],
      });
      arrEmail.push(emails.email);
    }

    // const arreee = ["damian_yerien@hotmail.com", "damianyerien83@gmail.com"]

    var mailOptions = {
      from: "excursionappmail@gmail.com",
      to: arrEmail.toString(),
      cc: "excursionappmail@gmail.com",
      subject: subject,
      html: `
      <style>
      table, td, div, h1, p {font-family: Arial, sans-serif;}
    </style>
  </head>
  <body style="margin:0;padding:0;">
    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
      <tr>
        <td align="center" style="padding:0;">
          <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
            <tr>
              <td align="center" style="padding:40px 0 30px 0;background:#D8D2CB;">
              <a href="https://excursionapp.vercel.app" style="color:#ffffff;text-decoration:underline;"/>
                <img src="https://res.cloudinary.com/excursionesapp/image/upload/v1647736554/Sin_t%C3%ADtulo_200_100_px_200_50_px_400_200_px_vbg9mk.png" alt="" width="300" style="height:auto;display:block;" />
              </td>
              
            </tr>
            <tr>
              <td style="padding:36px 30px 42px 30px;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                  <tr>
                    <td style="padding:0 0 36px 0;color:#153643;">
                      <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">El administrador de la excursion ${product} del dia ${dates} a las ${schedule}hs tiene algo que decirte..</h1>
                      <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"></p> 
                      <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                       <h2>Mensaje: </h2>    
                       <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> ${content} </p>
                      </p>
                    </td>
                    <td style="padding:0 0 36px 0;color:#153643;">
                   
                    </td>
                  </tr>                
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;background:#0284c7;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                  <tr>
                    <td style="padding:0;width:50%;" align="left">
                      <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                        &reg; Realizado por Henry´s Students. Todos los derechos reservados<br/><a href="https://excursionapp.vercel.app" style="color:#ffffff;text-decoration:underline;">Link a web</a>
                      </p>
                    </td>
                    <td style="padding:0;width:50%;" align="right">
                      <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                        <tr>                          
                          <td style="padding:0 0 0 10px;width:38px;">
                          <a href="https://github.com/LorenzoPodio/PG-Henry/" style="color:#ffffff;"><img src="https://res.cloudinary.com/excursionesapp/image/upload/v1647736928/logo_git_bxvzgp.jpg" alt="github" width="38" style="height:auto;display:block;border:0;" /></a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table> 
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.message);
      } else {
        res.status(200).jsonp(arrEmail);
      }
    });
  } catch (e) {
    console.log(e)
  }
});

module.exports = setMail;
