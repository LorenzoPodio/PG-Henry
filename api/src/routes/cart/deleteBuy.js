const { Router } = require("express");
const deleteBuy = Router();
const { Order, Order_detail, Product } = require("../../db");
const transporter = require ("../../mailer/mailer");
//ruta para eliminar una compra y retornar el stock al producto
//requiere ir de order

deleteBuy.delete("/", async (req, res, next) => {
    try {
        const { email, orderId } = req.body;
        if (!orderId || !email) {
            return res.status(202).send("Necessary parameters not found");
        }

        const details = await Order_detail.findAll({
            where: {
                orderId: orderId
            },
            include: [{
                model: Product, attributes: ["name", "date", "id", "stock" ],

            }],
                

        })
     
        let mapProd = details?.map(order => {
            return order.dataValues.product
        });
        let nameProd = mapProd?.map(name => {
            return {
                name: name.dataValues.name,
                date: name.dataValues.date,
                id : name.dataValues.id,
                stock:name.dataValues.stock,
            }
        })

        let mapPrice = details?.map(order => {
            return {
                price: order.dataValues.price,
                quantity: order.dataValues.quantity
            }
        })

        function arrayHandler(array1, array2) {
            if (array1.length === array2.length) {
                var a = ""
                for (var i = 0; i < array1.length; i++) {
                    a = a + "Su excursion: " + array1[i].name + " para el dia " + array1[i].date + " , para " + array2[i].quantity + " personas fue Cancelada.<br/> <br/>"
                }
            }
            return a
        }

        const datesMail = arrayHandler(nameProd, mapPrice)

        var mailOptions = {
            from: "excursionappmail@gmail.com",
            to: email,
            subject: "Cancelación de compra - ExcursionApp",
            html: `<img src= "https://img.icons8.com/color/48/000000/around-the-globe.png" />
        <h3>ExcursionApp</h3><hr/>
        <br/>
        <br/>
        <h3>Le acercamos información sobre la cancelación de su compra.</h3> <br/>
        El detalle es: <br/>
        <br/>
        ${datesMail} 
        <br/>
        <br/>            
        Por favor califique su experiencia en la aplicacion. </h1> `
        }

        await Order.update(
            { status: "cancelled" },
            { where: { id: orderId } }
        );

        function arrayHand(array1, array2) {
            if (array1.length === array2.length) {
                
                for (var i = 0; i < array1.length; i++) {
                    
                Product.update(
                    { stock: array1[i].stock + array2[i].quantity },
                    { where: { id: array1[i].id } }
                )
                
                }
            }
        }
         arrayHand(nameProd, mapPrice)

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.message);
            } else {
      res.status(200).jsonp("newStock");
            }   
        })
        
    } catch (error) {
        next(error);
    }
    
});

module.exports = deleteBuy;