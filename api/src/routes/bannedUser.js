const { Router } = require("express");
const bannedUser = Router();
const { User } = require("../db");

bannedUser.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.update(
      {
        isBanned: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    next(error);
  }
});

module.exports = bannedUser