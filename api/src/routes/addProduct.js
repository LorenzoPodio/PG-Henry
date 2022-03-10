const { Router } = require("express");
const addProduct = Router();
const { Product } = require("../db.js");

// Esto tiene que venir cuando agrega al carrito   

addProduct.post("/", async (req, res, next) => {
    try {
        let { name, day, date, time, amount, price } = req.body;
        if (!name || !day || !date || !time || !amount || !price) {
            return res.status(500).send("Necessary parameters not found");
        }
        const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

        const newProduct = await Product.findOrCreate({
            where: {
                name: nameUpper,
                day: day,
                date: date,
                time: time,
                price: price
            }
        });

        if (newProduct[0].stock - amount >= 0) {


            await Product.update(
                {
                    stock: newProduct[0].stock - amount,
                    name: newProduct[0].name,
                    day: newProduct[0].day,
                    date: newProduct[0].date,
                    time: newProduct[0].time,
                    price: newProduct[0].price,
                },
                {
                    where: {
                        id: newProduct[0].id,
                    },
                }
            );



            res.status(200).json(newProduct[0].stock - amount);
        } else { res.status(404).send(`Solo quedan ${newProduct[0].stock} cupos disponibles `); }
    } catch (error) {
        next(error)

    }
});

module.exports = addProduct;