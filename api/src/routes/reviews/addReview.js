const { Router } = require("express");
const addReview = Router();
const { Reviews, User, Order, Product, Excursion } = require("../../db");

addReview.post("/:id", async (req, res, next) => {
  const { title, description, rating, email } = req.body;
  const { id } = req.params;
  try {
    const getUserId = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["id"],
    });

    const orders = await Order.findAll({
      where: {
        status: ["completed"],
        userId: getUserId.dataValues.id,
      },
      include: [
        { model: User, attributes: ["name", "email"] },
        { model: Product, attributes: ["name", "id"] },
      ],
    });
    const excursion = await Excursion.findOne({
      where: {
        id: id,
      },
    });
    // console.log(excursion?.dataValues?.name, "EEEEEEEEEEEEEEEEEEEEEEEEE");

    let orderProducts = orders?.map((e) => e.products);
    let buyedExcursion = orderProducts[0]?.map((e) => e.dataValues.name);

    // console.log(buyedExcursion, "probando buyedExcursion name???");

    if (buyedExcursion?.includes(excursion?.dataValues?.name)) {
      await Reviews.create({
        title: title,
        description: description,
        rating: rating,
        userId: getUserId.dataValues.id,
        excursionId: id,
      });
      return res.status(201).send("Opinión agregada");
    }
    return res
      .status(404)
      .json("Debes adquirir la excursión para dar una opinión");
  } catch (error) {
    next(error);
  }
});

module.exports = addReview;
