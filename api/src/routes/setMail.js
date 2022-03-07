const { Router } = require("express");
const transporter = require("../mailer/mailer")
const setMail = Router();

setMail.post("/", (req, res, next) => {
  let {from, to, subject, text, html} = req.body;
  var mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.message);
    } else {
      console.log("email enviado")
      res.status(200).jsonp(req.body);
    }
  })
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
