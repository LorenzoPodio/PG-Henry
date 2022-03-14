const { Router } = require("express");
const putExcursion = Router();
const { Excursion } = require("../db");


//ruta para modificar datos de las excursiones cargadas en la db
//obtenemos la ruta por id y en caso de que algun dato
//que estaba cargado previamente no lo pasen nuevamente
//deja el mismo dato que estaba anteriormente

putExcursion.put("/:id", async (req, res, next) => {
  try {
    const excursionId = req.params.id;
    const {
      name,
      Images,
      description,
      location,
      date,
      time,
      price,
      extra,
      excursionType,
    } = req.body;
    const excursion = await Excursion.findAll({
      where: {
        id: excursionId,
      }
    });
    await Excursion.update(
      {
        name: name ? name : excursion[0].name,
        Images: Images ? Images : excursion[0].Images,
        description: description ? description : excursion[0].description,
        location: location ? location : excursion[0].location,
        date: date ? date : excursion[0].date,
        time: time ? time : excursion[0].time,
        price: price ? price : excursion[0].price,
        extra: extra ? extra : excursion[0].extra,
        excursionType: excursionType ? excursionType : excursion[0].excursionType,
      },
      {
        where: {
          id: excursionId,
        },
      }
    );

    const excursions = await Excursion.findAll();
    res.status(200).json(excursions);
  } catch (error) {
    next(error);
  }
});

module.exports = putExcursion;
