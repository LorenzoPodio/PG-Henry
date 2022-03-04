const { Router } = require("express");
const changeDatesAdmin = Router();
const { UserAdmin } = require("../db");

changeDatesAdmin.put("/:id", async (req, res, next) => {
  try {
    const idAdmin = req.params.id;
    const { email, password, name, lastName } = req.body;
    await UserAdmin.update(
      {
        email: email,
        password: password,
        name: name,
        lastName: lastName,
      },
      {
        where: {
          id: idAdmin,
        },
      }
    );
    res.status(200).send("Changes ok");
  } catch (error) {
    next(error);
  }
});

module.exports = changeDatesAdmin;
