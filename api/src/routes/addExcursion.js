const { Router } = require("express");
const addExcursion = Router();
const { Excursion } = require("../db");

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
    } = req.body;
    if (!name || !description || !location || !date || !time) {
      return res.status(500).send("Necessary parameters not found");
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
    });
    return res.status(201).json(newExcursion);
  } catch (error) {
    next(error);
  }
});

module.exports = addExcursion;
