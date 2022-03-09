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
    res.status(200).send("User banned")
  } catch (error) {
    next(error);
  }
});
