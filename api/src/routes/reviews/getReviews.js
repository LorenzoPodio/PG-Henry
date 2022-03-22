const { Router } = require("express");
const getReviews = Router();
const { Reviews, User, Order, Product, Excursion } = require("../../db");


getReviews.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try {
        
    } catch (error) {
        next(error)
    }
})