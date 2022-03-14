const { Router } = require("express");
const unbanUser = Router();
const { User } = require("../db");

unbanUser.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.update(
      {
        isBanned: false,
      },
      {
        where: {
          id: id,
        },
      }
    );
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = unbanUser;
