const { Router } = require("express");
const changeDatesUser = Router();
const { User } = require("../db");

changeDatesUser.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email, password, name, lastName, adress, dni } = req.body;
    const user = await User.findAll({
      where: {
        id: id,
      }
    });
    await User.update(
      {
        email: email ? email : user[0].email,
        password: password ? password : user[0].password,
        name: name ? name : user[0].name,
        lastName: lastName ? lastName : user[0].lastName,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send("Changes ok");
  } catch (error) {
    next(error);
  }
});

module.exports = changeDatesUser;