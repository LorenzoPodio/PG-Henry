
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'excursionappmail@gmail.com',
    pass: "pbfjpyuvowogbebj",
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;

  // la contraseñña deberia estar en el archivo .env, pero a fines practicos la dejo aca