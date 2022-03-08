const { Router } = require("express");
const putExcursion = Router();
const { Excursion } = require("../db");

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

    await Excursion.update(
      {
        name: name,
        Images: Images,
        description: description,
        location: location,
        date: date,
        time: time,
        price: price,
        extra: extra,
        excursionType: excursionType,
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
