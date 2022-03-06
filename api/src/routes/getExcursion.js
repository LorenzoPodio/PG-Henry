const { Router } = require("express");
const { Excursion } = require("../db");
const getExcursion = Router();
const { Sequelize, Op } = require("sequelize");

getExcursion.get("/", async (req, res, next) => {
  try {

    const { id, name, location, date, excursionType } = req.query;
    if (name) {
      const excursionName = await Excursion.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        }
      });
      excursionName.length ? res.status(200).send(excursionName)
        : res.status(500).send("Excursion not found");
    } else if (id) {
      const excursionId = await Excursion.findByPk(id);
      excursionId ? res.status(200).send(excursionId)
    } else if (date && excursionType && location) {
      let day = date.charAt(0).toUpperCase() + date.slice(1);
      const exDateTypeLoc = await Excursion.findAll({
        where: {
          date: { [Op.contains]: [day] },
          excursionType: { [Op.iLike]: `%${excursionType}%` },
          location: { [Op.iLike]: `%${location}%` },
        },
      });
      exDateTypeLoc.length
        ? res.status(200).send(exDateTypeLoc)
        : res.status(500).send("Excursion not found");
    } else if (date && excursionType) {
      let day = date.charAt(0).toUpperCase() + date.slice(1);
      const exDateType = await Excursion.findAll({
        where: {
          date: { [Op.contains]: [day] },
          excursionType: { [Op.iLike]: `%${excursionType}%` },
        },
      });
      exDateType.length
        ? res.status(200).send(exDateType)
        : res.status(500).send("Excursion not found");
    } else if (date && location) {
      let day = date.charAt(0).toUpperCase() + date.slice(1);
      const exDateLoc = await Excursion.findAll({
        where: {
          date: { [Op.contains]: [day] },
          location: { [Op.iLike]: `%${location}%` },
        },
      });
      exDateLoc.length
        ? res.status(200).send(exDateLoc)
        : res.status(500).send("Excursion not found");
    } else if (location && excursionType) {
      const exLocType = await Excursion.findAll({
        where: {
          location: { [Op.iLike]: `%${location}%` },
          excursionType: { [Op.iLike]: `%${excursionType}%` },
        },
      });
      exLocType.length
        ? res.status(200).send(exLocType)
        : res.status(500).send("Excursion not found");
    } else if (location) {
      const excursionLocation = await Excursion.findAll({
        where: {
          location: { [Op.iLike]: `%${location}%` },
        }
      });
      excursionLocation.length ? res.status(200).send(excursionLocation)
        : res.status(500).send("Excursion not found");
    } else if (date) {
      let day = date.charAt(0).toUpperCase() + date.slice(1);
      const excursionDate = await Excursion.findAll({
        where: {
          date: { [Op.contains]: [day] }
        }
      });
      excursionDate.length ? res.status(200).send(excursionDate)
        : res.status(500).send("Excursion not found");
    } else if (excursionType) {
      const exType = await Excursion.findAll({
        where: {
          excursionType: { [Op.iLike]: `%${excursionType}%` },
        }
      });
      exType.length ? res.status(200).send(exType)
        : res.status(500).send("Excursion not found");
    } else {
      const excursion = await Excursion.findAll()
      return res.status(200).send(excursion)
    }
  }
  catch (error) {
    next(error)
  }
});


module.exports = getExcursion;
