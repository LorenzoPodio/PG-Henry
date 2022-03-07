const { Router } = require("express");
const recoverPass = Router();
const { UserAdmin } = require("../db.js");
const transporter = require("../mailer/mailer")

recoverPass.post("/", async (req, res, next) => {
    try {
        let { email } = req.body;
        const user = await UserAdmin.findAll({
            where: {                
                email: email,
            }, 
        });
        let pass = user[0].password
        let name= user[0].name
        var mailOptions = {
            from: "excursionappmail@gmail.com",
            to: email,
            subject: "Recupero de contraseña ExcursionApp",
            html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
            <h3>ExcursionApp</h3>
            <h3>Hola ${name}, su contraseña es:</h3> <h1> ${pass}</h1> `
        }
        transporter.sendMail(mailOptions, (error, info) => {
            res.status(200).json("Contraseña enviada");
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = recoverPass;