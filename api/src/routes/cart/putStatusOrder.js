const { Router } = require("express");
const putStatusOrder = Router ();
const { User , Order, Order_detail , Product } = require("../../db");
const transporter = require ("../../mailer/mailer");


//ruta para cancelar una orden al cliente y envia
//email informativo


putStatusOrder.put("/:id", async (req, res, next) => {
    try {
        // const { status } = req.body;
        const { id } = req.params;
       
            await Order.update({
                status: "cancelled"
            },{
                where:{
                    id: id
                }
            })

            const stateOrder = await Order.findByPk(id,{
                include: [
                { model: User, attributes: ["name", "lastName","email"]}
                ]
            })
            let email = stateOrder.dataValues.user.email;
            let name = stateOrder.dataValues.user.name;
            let lastName = stateOrder.dataValues.user.lastName;


            const details = await Order_detail.findAll({
                where: {
                    orderId: stateOrder.dataValues.id
                },
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
                    a = a+ "Se cancela "+ array1[i].name+ " para el dia "+  array1[i].date + "<br/> <br/>"
                    }
                  }
                  return a
                }
            
            const datesMail = arrayHandler(nameProd, mapPrice)
        
    
    
            var mailOptions = {
                from: "excursionappmail@gmail.com",
                to:  email,
                subject: "Detalle de compra cancelada - ExcursionApp",
                html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
                <h3>ExcursionApp</h3><hr/>
                <br/>
                <br/>
                <h3>Hola ${name} ${lastName} su compra fue cancelada, por favor contactase para resolver el inconveniente. <br/>
                <br/>
                            <br/>
                            ${datesMail} 
                             <br/>
                                 <br/>     
                Le pedimos disculpas por las molestias ocasionadas.
                <hr/>       
                Por favor califique su experiencia en la aplicacion. </h1> `
            }
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).send(error.message);
            } else {
              res.status(200).jsonp(req.body);
            }
          })
            return res.status(200).send(details)

    } catch (error) {
        next(error)
    }
})

module.exports = putStatusOrder;