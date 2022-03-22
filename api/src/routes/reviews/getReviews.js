const { Router } = require("express");
const getReviews = Router();
const { Reviews, User } = require("../../db");


getReviews.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try {
      const reviews = await Reviews.findAll({
           where: {
               excursionId: id
           },
           include: [
               {model: User, attributes:["name", "lastName"]}
           ]
       })
       return res.status(200).json(reviews) 
    } catch (error) {
        next(error)
    }
})

module.exports = getReviews;