const { Router } = require('express');
const router = Router();
const addExcursion = require('./addExcursion')
const addAdmin = require('./addAdmin')
const getExcursion = require('./getExcursion')
const deleteExcursion = require('./deleteExcursion')





router.use("/deleteexcursion", deleteExcursion)
router.use("/getexcursion", getExcursion)
router.use("/addexcursion", addExcursion)
router.use("/addadmin", addAdmin)
module.exports = router;
