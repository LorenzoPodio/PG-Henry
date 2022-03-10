const { Router } = require("express");
const changeDatesAdmin = Router();
const { UserAdmin } = require("../db");

changeDatesAdmin.put("/:id", async (req, res, next) => {
  try {
    const idAdmin = req.params.id;
    const { email, password, name, lastName } = req.body;
    const user = await UserAdmin.findAll({
      where: {
        id: idAdmin,
      }
    });
    await UserAdmin.update(
      {
        email: email ? email : user[0].email,
        password: password ? password : user[0].password,
        name: name ? name : user[0].name,
        lastName: lastName ? lastName : user[0].lastName,
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