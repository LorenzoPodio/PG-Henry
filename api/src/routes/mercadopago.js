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
      success: "/mercadopago/feedback",
      failure: "/mercadopago/feedback",
      pending: "/mercadopago/feedback",
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
          attributes: ["name", "date", "id", "stock"],
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
            "Su excursion: " +
            array1[i].name +
            " para el dia " +
            array1[i].date.substring(1,11) +
            " , para " +
            array2[i].quantity +
            " personas , <br/>";
        }
      }
      return a;
    }

    const datesMail = arrayHandler(nameProd, mapPrice);

    if (status === "approved") {
      var mailOptions = {
        from: "excursionappmail@gmail.com",
        to: email,
        subject: `Hola ${name} ${lastName}, su pago ha sido aprobado - ExcursionApp`,
        html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
  <h3>ExcursionApp</h3><hr/>
  <br/>
  <br/>
  <h3>Le acercamos información sobre su compra.</h3> <br/>
  El detalle es: <br/>
  <br/>
  ${datesMail} fue aprobado, que lo disfrute!
  <br/>
  Ante cualquier anomalía el administrador de la excursión se pondra en contacto con usted
  <br/>
  <br/>            
  Por favor califique su experiencia en la aplicacion. </h1> `,
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
        subject: `Hola ${name} ${lastName}, su pago esta pendiente - ExcursionApp`,
        html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
  <h3>ExcursionApp</h3><hr/>
  <br/>
  <br/>
  <h3>Le acercamos información sobre el estado su compra.</h3> <br/>
  El detalle es: <br/>
  <br/>
  ${datesMail} fue guardada, al momento de acreditarse el pago si hay stock disponible le llegara una notificación confirmandole la operación.
  <br/>
  Ante cualquier anomalía el administrador de la excursión se pondra en contacto con usted
  <br/>
  <br/>            
  Por favor califique su experiencia en la aplicacion. </h1> `,
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
        subject: `Hola ${name} ${lastName}, su pago ha sido rechazado - ExcursionApp`,
        html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
  <h3>ExcursionApp</h3><hr/>
  <br/>
  <br/>
  <h3>Le acercamos información sobre el estado su compra.</h3> <br/>
  El detalle es: <br/>
  <br/>
  Lo sentimos, hubo un error al intentar generar el cobro.
  <br/>
  Por favor pongase en contacto con el medio que intento realizar el pago e intente nuevamente, recuerde verificar la disponibilidad de las fechas escogidas anteriormente.
  <br/>
  <br/>            
  Por favor califique su experiencia en la aplicacion. </h1> `,
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
