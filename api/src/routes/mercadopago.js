const { Router } = require("express");
const mp = Router();
const mercadopago = require("mercadopago");
const { User, Order_detail, Order, Product } = require("../db");
const transporter = require("../mailer/mailer");

//ruta mercadopago

mercadopago.configure({
  access_token:
    "TEST-5919072404673194-030821-f3180fd391d21f8aa61f48abfaf2624d-1086472471",
});

mp.post("/", function (req, res) {
  const allTotalsPrices = req.body.cartItems.map((e) => e.totalPrice);
  const namesExcursions = req.body.cartItems.map((e) => e.product.name);
  const reduc = (accumulator, curr) => accumulator + curr;
  const priceToPay = allTotalsPrices.reduce(reduc, 0);
  const email = req.body.email;

  let preference = {
    items: [
      {
        title: "Excursiones adquiridas " + namesExcursions,
        unit_price: priceToPay,
        quantity: 1,
        // title: req.body.product,
        // unit_price: req.body.price,
        // quantity: req.body.quantity,
      },
    ],

    external_reference: email,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm",
        },
      ],
      installments: 3, //Cantidad máximo de cuotas
    },
    back_urls: {
      success: "http://localhost:3001/mercadopago/feedback",
      failure: "http://localhost:3001/mercadopago/feedback",
      pending: "http://localhost:3001/mercadopago/feedback",
    },
    // auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({ id: response.body.id });
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
    });
});

mp.get("/feedback", async function (req, res, next) {
  try {
    const status = req.query.status;
    const email = req.query.external_reference;

    if (!status || !email) {
      return res.status(500).send("Ocurrio un error");
    }
    const userDetails = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["name", "lastName", "email", "id"],
      include: [
        {
          model: Order,
          attributes: ["id", "status"],
        },
      ],
    });

    const orderId = userDetails?.dataValues.orders[0].dataValues.id;
    const name = userDetails?.dataValues.name;
    const lastName = userDetails?.dataValues.lastName;
    const idUser = userDetails?.dataValues.id;

    const details = await Order_detail.findAll({
      where: {
        orderId: orderId,
      },
      include: [
        {
          model: Product,
          attributes: ["name", "date", "id", "stock","time"],
        },
      ],
    });
    let mapProd = details?.map((order) => {
      return order?.dataValues.product;
    });
    let nameProd = mapProd?.map((name) => {
      return {
        name: name?.dataValues.name,
        date: name?.dataValues.date,
        id: name?.dataValues.id,
        stock: name?.dataValues.stock,
        time: name?.dataValues.time
      };
    });

    let mapPrice = details?.map((order) => {
      return {
        price: order?.dataValues.price,
        quantity: order?.dataValues.quantity,
      };
    });

    function arrayHandler(array1, array2) {
      if (array1.length === array2.length) {
        var a = "";
        for (var i = 0; i < array1.length; i++) {
          a =
            a +
            "Excursion: " +
            array1[i].name +
            " para el dia " +
            array1[i].date.substring(1,11) +
            " a las " + array1[i].time + "hs para " +
            array2[i].quantity +
            " personas  por un valor unitario de $"+ array2[i].price +". <br/>";
        }
      }
      return a;
    }

    const datesMail = arrayHandler(nameProd, mapPrice);

    if (status === "approved") {
      var mailOptions = {
        from: "excursionappmail@gmail.com",
        to: email,
        subject: `Hola ${name} ${lastName}, su pago ha sido aprobado ! - excursionApp`,
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
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">${name}, te acercamos información sobre el estado su compra. </h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">El pago fue aprobado.</p> 
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                         Adquiriste con éxito los siguientes productos:
                         <br/>
                         <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> ${datesMail} </p>
                         <br/>  
                         <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Ante cualquier anomalía el administrador de la excursón se pondrá en contacto, 
                         sino ante cualquier inconveniente abajo tenes el link a nuestra web y en el pie de nuestra página un formulario de contacto.</p>
                        </p>
                        <br/>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                        ¡ Que disfrutes las excursiones !
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
      </table>  `,
      };

      await Order.update(
        { status: "completed", date: new Date().toLocaleDateString() },
        { where: { id: orderId } }
      );

      function arrayHand(array1, array2) {
        if (array1.length === array2.length) {
          for (var i = 0; i < array1.length; i++) {
            Product.update(
              { stock: array1[i].stock - array2[i].quantity },
              { where: { id: array1[i].id } }
            );
          }
        }
      }
      await Order.findOrCreate({
        where: {
          userId: idUser,
          status: "empty", 
          date: new Date().toLocaleDateString(),
        },
      });
      arrayHand(nameProd, mapPrice);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.message);
        } else {
          res.status(200).jsonp("email enviado");
        }
      });
    } else if (status === "pending") {
      var mailOptions = {
        from: "excursionappmail@gmail.com",
        to: email,
        subject: `${name} ${lastName}, su pago esta pendiente - excursionApp`,
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
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">${name}, te acercamos información sobre el estado su compra. </h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">El pago aún no fue procesado.</p> 
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                         En tu carrito quedan guardados los siguientes productos.
                         <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> ${datesMail} </p>
                         <br/>  
                         <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">En caso de elegir otro medio de pago y volver a realizar la compra
                         recorda verificar que haya disponibilidad para la fecha y el horario elegido anteriormente, no te pierdas las aventuras nuevas que te esperan !</p>
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
      </table> `,
      };
      await Order.update(
        { status: "processingPay" },
        { where: { id: orderId } }
      );

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.message);
        } else {
          res.status(200).jsonp("email enviado");
        }
      });
    } else {
      var mailOptions = {
        from: "excursionappmail@gmail.com",
        to: email,
        subject: `${name} ${lastName}, su pago ha sido rechazado - excursionApp`,
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
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">${name}, te acercamos información sobre el estado su compra. </h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> Lo sentimos, hubo un error al intentar generar el cobro.</p> 
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                         En tu carrito quedan guardados los siguientes productos.
                         <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> ${datesMail} </p>
                         <br/>  
                         <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">En caso de elegir otro medio de pago y volver a realizar la compra
                         recorda verificar que haya disponibilidad para la fecha y el horario elegido anteriormente, no te pierdas las aventuras nuevas que te esperan !</p>
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
      </table> `,
      };

      await Order.update(
        { status: "processingPay" },
        { where: { id: orderId } }
      );

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.message);
        } else {
          res.status(200).jsonp("email enviado");
        }
      });
    }

    res.status(200).redirect("http://localhost:3000/excursiones");
  } catch (error) {
    next(error);
  }
});

module.exports = mp;
