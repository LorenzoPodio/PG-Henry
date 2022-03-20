const { Router } = require("express");
const putStatusOrder = Router();
const { User, Order, Order_detail, Product } = require("../../db");
const transporter = require("../../mailer/mailer");

//ruta para cancelar una orden al cliente y envia
//email informativo

putStatusOrder.put("/:id", async (req, res, next) => {
  try {
    // const { status } = req.body;
    const { id } = req.params;

    await Order.update(
      {
        status: "cancelled",
      },
      {
        where: {
          id: id,
        },
      }
    );

    const stateOrder = await Order.findByPk(id, {
      include: [{ model: User, attributes: ["name", "lastName", "email"] }],
    });
    let email = stateOrder.dataValues.user.email;
    let name = stateOrder.dataValues.user.name;
    let lastName = stateOrder.dataValues.user.lastName;

    const details = await Order_detail.findAll({
      where: {
        orderId: stateOrder.dataValues.id,
      },
      include: [
        {
          model: Product,
          attributes: ["name", "date", "time"],
        },
      ],
      attributes: ["price", "quantity"],
    });
    let mapProd = details.map((order) => {
      return order.dataValues.product;
    });
    let nameProd = mapProd.map((name) => {
      return {
        name: name.dataValues.name,
        date: name.dataValues.date,
        time: name.dataValues.time
      };
    });

    let mapPrice = details.map((order) => {
      return {
        price: order.dataValues.price,
        quantity: order.dataValues.quantity,
      };
    });

    function arrayHandler(array1, array2) {
      if (array1.length === array2.length) {
        var a = "";
        for (var i = 0; i < array1.length; i++) {
          a =
            a +
            "Se cancela " +
            array1[i].name +
            " para el dia " +
            array1[i].date.substring(1,11) +
            " a las " + array1[i].time + "hs para " +
            array2[i].quantity +
            " personas  por un valor unitario de $"+ array2[i].price +". <br/>"
            "<br/> <br/>";
        }
      }
      return a;
    }

    const datesMail = arrayHandler(nameProd, mapPrice);

    var mailOptions = {
      from: "excursionappmail@gmail.com",
      to: email,
      subject: "Detalle de compra cancelada - ExcursionApp",
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
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">${name}, su compra fue cancelada</h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">.</p> 
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                         Lamentamos informarle que su compra fue cancelada, el detalle es 
                         <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> ${datesMail} </p>
                        </p>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                        Hubo un inconveniente con tu compra, conserva este email como comprobante para una devolucion o una reprogramacion.
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

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.message);
      } else {
        res.status(200).jsonp(req.body);
      }
    });

    const actualOrders = await Order.findAll({
      where: {
        status: ["completed", "cancelled"],
      },
      include: [
        { model: User, attributes: ["name", "email"] },
        { model: Order_detail },
        { model: Product },
      ],
    });

    return res.status(200).send(actualOrders);
  } catch (error) {
    next(error);
  }
});

module.exports = putStatusOrder;
