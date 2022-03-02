const { Router } = require("express");
const { Excursion } = require('../db');
const getExcursion = Router();
const { Sequelize, Op } = require("sequelize");

getExcursion.get("/", async (req, res, next) => {
    try {

        const { name, location, date } = req.query;
        if (name) {
            const excursionName = await Excursion.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` },
                }
            });
            excursionName.length ? res.status(200).send(excursionName)
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
            var day = date;
            const excursionDate = await Excursion.findAll({

                where: {

                    date: { [Op.contains]: [`${day}`] }
                }
            });
            excursionDate.length ? res.status(200).send(excursionDate)
                : res.status(500).send("Excursion not found");
        }
        else {
            const excursion = await Excursion.findAll()
            return res.status(200).send(excursion)
        }
    }
    catch (error) {
        next(error)
    }
})

module.exports = getExcursion;