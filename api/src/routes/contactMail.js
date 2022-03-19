const { Router } = require("express");
const transporter = require("../mailer/mailer");
const contactMail = Router();

contactMail.post("/", async (req, res, next) => {
  try {
    const { name, emailUs, text } = req.body;
    const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

    var mailOptions = {
        from: "excursionappmail@gmail.com",
        to: "excursionappmail@gmail.com",
        cc: emailUs,
        subject: nameUpper + " recibimos tu consulta con éxito",
        html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
        <h3>ExcursionApp</h3><hr/>
        <br/>
        <br/>

        Gracias por contactarte con nosotros, te enviamos una copia de la consulta,
        vamos a despejar todas las dudas en breve, tranqui. 
        <br/>
        <br/>

        Consulta recibida : ${text} 
        <br/>
        <br/>

        Por favor califique su experiencia en la aplicacion.
        `
      }
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.message);
        } else {
          res.status(200).json("email send ok");
        }
       })

  } catch (error) {
    next(error);
  }
});


module.exports = contactMail ;