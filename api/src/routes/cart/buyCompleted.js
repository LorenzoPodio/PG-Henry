const { Router } = require("express");
const buyCompleted = Router ();
const { User , Order, Order_detail , Product } = require("../../db");
const transporter = require ("../../mailer/mailer");


//ruta para enviar mail en caso de compra rechazada o exitosa

buyCompleted.post("/", async (req, res, next) => {
 const success = true;
 const failure = false

    try {
        const { id } = req.body;
        const stateOrder = await Order.findByPk(id,{
            include: [
            { model: User, attributes: ["name", "lastName","email"]}
            ]
        })
        let email = stateOrder.dataValues.user.email;
        let name = stateOrder.dataValues.user.name;
        let lastName = stateOrder.dataValues.user.lastName;
         if (success){
        const details = await Order_detail.findAll({
            where: {
                orderId: stateOrder.dataValues.id
            },attributes: ["status"],
            include: [{
                model: Product, attributes: ["name", "date"],

            }],
            attributes: ["price", "quantity"]
            
        })  
        let mapProd = details.map(order => {
           return order.dataValues.product
        });
        let nameProd = mapProd.map(name => {
            return {
                name: name.dataValues.name,
                date: name.dataValues.date
            }
        })

        let mapPrice = details.map(order => {
            return {
                price: order.dataValues.price,
                quantity: order.dataValues.quantity}
        })
        
        function arrayHandler(array1,array2){
            if(array1.length===array2.length)
             {
                var a = ""
            for (var i = 0; i < array1.length; i++) 
                {
                a = a+ "Su excursion es: "+ array1[i].name+ " para el dia "+  array1[i].date +" y el valor de la excursion es de $"+(array2[i].price * array2[i].quantity)+ " , para " + array2[i].quantity + " personas.<br/> <br/>"
                }
              }
              return a
            }
        
        const datesMail = arrayHandler(nameProd, mapPrice)
    

        // console.log(concat, 'que haya caaaaaaaaaaaa')

        var mailOptions = {
            from: "excursionappmail@gmail.com",
            to:  email,
            subject: "Detalle de compra - ExcursionApp",
            html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
            <h3>ExcursionApp</h3><hr/>
            <br/>
            <br/>
            <h3>Hola ${name} ${lastName} su compra fue realizada con éxito. Que la disfute. <br/>
            El detalle es: <br/>
                        <br/>
                         ${datesMail} 
                         <br/>
                             <br/>            
            Por favor califique su experiencia en la aplicacion. </h1> `
        }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.message);
        } else {
          console.log("email enviado")
          res.status(200).jsonp(req.body);
        }
      })

      await Order_detail.update({
        status: "completed",
      },{
          where: {
              id: id
          }
      })
        return res.status(200).send(details)}
        else if (failure) {
            var mailOptions = {
                from: "excursionappmail@gmail.com",
                to:  email,
                subject: "Compra rechazada - ExcursionApp",
                html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
                <h3>ExcursionApp</h3><hr/>
                <br/>
                <br/>
                <h3>Hola ${name} ${lastName} su compra fue rechazada, por favor pongase en contacto con el administrador de pagos e intente nuevamente. <br/>
                
                             <br/>
                                 <br/>            
                Por favor califique su experiencia en la aplicacion. </h1> `
            }
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).send(error.message);
            } else {
              console.log("email enviado")
              res.status(200).jsonp(req.body);
            }
          })
        }
    } catch (error) {
        next(error)   
    }

}) 

module.exports = buyCompleted;