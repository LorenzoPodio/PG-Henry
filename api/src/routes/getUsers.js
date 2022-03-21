const { Router } = require("express");
const { User } = require("../db");
const getUsers = Router();
const { Sequelize, Op } = require("sequelize");

//ruta para obtener todos los usuarios de la db

getUsers.get("/", async (req, res, next) => {
  try {
    const { email } = req.query;
    const Users = await User.findAll();
    if (email) {
      const getUser = await User.findOne({
        where: {
          email: email,
        }
      });
      return res.status(200).json(getUser);
    }
    return res.status(200).send(Users);
  } catch (error) {
    next(error);
  }
});

module.exports = getUsers;
