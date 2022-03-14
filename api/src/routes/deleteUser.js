const { Router } = require("express");
const deleteUser = Router();
const { User } = require("../db");

//ruta para eliminar un usuario de la db
//requiere ir de usuario

deleteUser.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(500).send("Necessary parameters not found");
      }
      await User.destroy({
        where: {
          id: id,
        },
      });
  
      const users = await User.findAll();
      res.status(202).send("Eliminado correctamente");
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = deleteUser;