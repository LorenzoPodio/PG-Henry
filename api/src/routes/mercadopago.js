const { Router } = require("express");
const mp = Router();
const mercadopago = require("mercadopago");
// Agrega credenciales

//ruta mercadopago

mercadopago.configure({
  access_token:
  "TEST-5919072404673194-030821-f3180fd391d21f8aa61f48abfaf2624d-1086472471",
});

mp.post("/", function (req, res) {
  let preference = {
    // items: [
    //   {
    //     title: "ItemPrueba",
    //     unit_price: 100,
    //     quantity: 1,
    //   },
    // ],
    items: req.body.map(e => e),
    external_reference : "1",
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm"
        }
      ],
      installments: 3  //Cantidad máximo de cuotas
    },
    back_urls: {
      success: "http://localhost:3001/mercadopago/feedback",
      failure: "http://localhost:3001/mercadopago/feedback",
      pending: "http://localhost:3001/mercadopago/feedback",
    },
    auto_return: "approved",
  };
  console.log(preference.items,' quellego acaaaa')

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

mp.get("/feedback", function (req, res) {
  // res.json({
  //   Payment: req.query.payment_id,
  //   Status: req.query.status,
  //   MerchantOrder: req.query.merchant_order_id,
  // });
  const status = req.query.status
  console.log(status,'esteee')
  const allDates = req.query
  console.log(allDates, 'este otroooo')
});

module.exports = mp;
