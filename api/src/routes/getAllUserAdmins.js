const { Router } = require("express");
const { UserAdmin } = require('../db');
const getAllUserAdmins = Router();
const { Sequelize, Op } = require("sequelize");

getAllUserAdmins.get("/", async (req, res, next) => {
    try {
        const allUserAdmins = await UserAdmin.findAll()
        return res.status(200).send(allUserAdmins)
    }
    catch (error) {
        next(error)
    }
})

module.exports = getAllUserAdmins;