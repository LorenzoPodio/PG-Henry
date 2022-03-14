const { Router } = require("express");
const deleteExcursion = Router();
const { Excursion } = require("../db");


//ruta para eliminar una excursion cargada en la db
//requiere id de excursion creada

deleteExcursion.delete("/", async (req, res, next) => {
  try {
    let { id } = req.query;
    if (!id) {
      return res.status(500).send("Necessary parameters not found");
    }
    await Excursion.destroy({
      where: {
        id: id,
      },
    });

    const excursions = await Excursion.findAll();
    res.status(202).json(excursions);
  } catch (error) {
    next(error);
  }
});

module.exports = deleteExcursion;
