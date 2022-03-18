const { Router } = require("express");
const addExcursion = Router();
const { Excursion } = require("../db");

//ruta para añadir excursion nueva a la db como admin
//requiere name, description, location, date y time
//como parametros obligatorios

addExcursion.post("/", async (req, res, next) => {
  try {
    let {
      name,
      Images,
      description,
      location,
      date,
      time,
      price,
      extra,
      excursionType,
      stock
    } = req.body;
    if (!name || !description || !location || !date || !time) {
      return res.status(202).send("Necessary parameters not found");
    }
    const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
    const newExcursion = await Excursion.create({
      name: nameUpper,
      Images,
      description,
      location,
      date,
      time,
      price,
      extra,
      excursionType,
      stock
    });
    return res.status(201).json(newExcursion);
  } catch (error) {
    next(error);
  }
});

module.exports = addExcursion;
