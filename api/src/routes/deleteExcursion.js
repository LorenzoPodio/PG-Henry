const { Router } = require("express");
const deleteExcursion = Router();
const { Excursion } = require("../db");

deleteExcursion.delete("/", async (req, res, next) => {
  try {
      let { id } = req.query;
      if (!id) {
        return res.status(500).send("Necessary parameters not found");
      }
      await Excursion.destroy({
          where: {
              id: id
          }
      })
      res.status(202).json("Deleted")
  } catch (error) {
    next(error);
  }
});

module.exports = deleteExcursion;