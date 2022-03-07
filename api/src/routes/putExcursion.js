const { Router } = require("express");
const putExcursion = Router();
const { Excursion } = require("../db");

putExcursion.put("/:id", async (req, res, next) => {
  try {
    const excursionId = req.params.id;
    console.log(excursionId)
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
    res.status(200).send("Changes ok")
  } catch (error) {
    next(error);
  }
});


module.exports = putExcursion;