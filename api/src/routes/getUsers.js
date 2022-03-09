const { Router } = require("express");
const { User } = require('../db');
const getUsers = Router();
const { Sequelize, Op } = require("sequelize");

getUsers.get("/", async (req, res, next) => {
    try {
        const Users = await User.findAll()
        return res.status(200).send(Users)
    }
    catch (error) {
        next(error)
    }
})