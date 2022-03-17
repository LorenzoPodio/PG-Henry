const { Router } = require("express");
const selectProduct = Router();
const { Product, Excursion } = require("../db.js");

// Esta ruta se ejecuta cuando se selecciona una excursione en el
//front para ver si tiene stock y retorna el stock actual de la excursion en esa fecha y dia
//y agrega el producto a una lista de productos

selectProduct.post("/", async (req, res, next) => {
  try {
    let { name, date, time, price, quantity } = req.body;
    if (!name || !date || !time || !price) {
      return res.status(500).send("Necessary parameters not found");
    }
    const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);

    const images = await Excursion.findOne({
      where: {
        name: nameUpper,
      },
      attributes: ["Images", "stock"],
    });

    const newProduct = await Product.findOrCreate({
      where: {
        name: nameUpper,
        date: date,
        time: time,
      },
      defaults: {
        price: price,
        Images: images.dataValues.Images,
        stock: images.dataValues.stock,
      },
    });

    if (quantity) return res.status(200).json(newProduct[0].stock - quantity);

    return res.status(200).json(newProduct[0].stock);

    //     // }
    //     else { res.status(404).send(`Solo quedan ${newProduct[0].stock} cupos disponibles `);
    // }
  } catch (error) {
    next(error);
  }
});

module.exports = selectProduct;
