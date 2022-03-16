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
  const allTotalsPrices = req.body.map(e => e.totalPrice);
  const namesExcursions = req.body.map(e => e.product.name);
  const reduc = (accumulator, curr) => accumulator + curr;
  const priceToPay = allTotalsPrices.reduce(reduc, 0);


  // console.log(priceToPay,namesExcursions,' quellego acaaaa')
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

mp.get("/feedback", function (req, res) {
  // res.json({
  //   Payment: req.query.payment_id,
  //   Status: req.query.status,
  //   MerchantOrder: req.query.merchant_order_id,
  // }); 
  const status = req.query.status

  try {
    if (status === "approved") {
      
        }
    
  } catch (error) {
    
  }

});

module.exports = mp;
