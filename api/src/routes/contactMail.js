const { Router } = require("express");
const transporter = require("../mailer/mailer");
const contactMail = Router();

contactMail.post("/", async (req, res, next) => {
  try {
    const { name, emailUs, text } = req.body;
    const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

    var mailOptions = {
      from: "excursionappmail@gmail.com",
      to: emailUs,
      bcc: "excursionappmail@gmail.com",
      subject: nameUpper + " recibimos tu consulta con éxito",
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
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">¡ ${nameUpper}, ya recibimos tu consulta !</h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Gracias por contactarte con nosotros, te enviamos una copia de la consulta,
                        vamos a despejar todas las dudas en breve, tranqui...</p> 
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                         Consulta recibida :   
                         <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> ${text} </p>
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
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.message);
      } else {
        res.status(200).json("email send ok");
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = contactMail;
