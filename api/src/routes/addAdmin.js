const { Router } = require("express");
const addAdmin = Router();
const { userAdmin } = require("../db");

addAdmin.post("/", async (req, res, next) => {
  try {
    let { user, email, password, name, lastName } = req.body;
    if (!name || !user || !email || !password || !lastName) {
      return res.status(500).send("Necessary parameters not found");
    }
    const nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
    const lastNameUpper = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const newAdmin = await userAdmin.create({
      user,
      email,
      password,
      name: nameUpper,
      lastName: lastNameUpper,
    });
    return res.status(202).json(newAdmin);
  } catch (error) {
    next(error);
  }
});

module.exports = addAdmin;
