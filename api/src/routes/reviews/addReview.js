const { Router } = require("express");
const addReview = Router();
const { Reviews, User, Order, Product, Excursion } = require("../../db");

addReview.post("/:id", async (req, res, next) => {
  const { description, rating, email } = req.body;
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
        status: ["completed"], //esto iría en completed pero esta en buying para testear
        userId: getUserId?.dataValues.id,
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
    let buyedExcursion = orderProducts[0]?.map((e) => e?.dataValues.name);

    // console.log(buyedExcursion, "probando buyedExcursion name???");
    const controlReview = await Reviews.findAll({
      where: {
        excursionId: id,
      },
    });
    
    // console.log(controlReview.map((e)=>e.userId), "AAAAAAA")

    if (controlReview?.map((e)=>e.userId).includes(getUserId?.dataValues?.id)){
      return res.status(403).json("Ya diste tu opinión")
    }

    if (buyedExcursion?.includes(excursion?.dataValues?.name)) {
      await Reviews.create({
        description: description,
        rating: rating,
        userId: getUserId?.dataValues.id,
        excursionId: id,
      });
      const response = await Reviews.findAll({ //posibilidad de mandar como respuesta directamente el array de opiniones
        where: {
          excursionId: id,
        },
        include: [
          {model: User, attributes:["name", "lastName"]}
      ]
      });
      return res.status(201).send(response); //en caso de no usar "response" cambiar el mensaje en el .send y comentar las lineas 57-64
    }
    return res
      .status(404)
      .json("Debes adquirir la excursión para dar una opinión");
  } catch (error) {
    next(error);
  }
});

module.exports = addReview;
