const { Router } = require('express');
const router = Router();
const addExcursion = require('./addExcursion')
const addAdmin = require('./addAdmin')
const getExcursion = require('./getExcursion')
const deleteExcursion = require('./deleteExcursion');
const putExcursion = require('./putExcursion');
const putDataAdmin = require('./putDataAdmin');
const getAllUserAdmins = require('./getAllUserAdmins')
const setMail = require('./setMail')
const recoverPass = require('./recoverPass')

router.use("/putDataAdmin", putDataAdmin)
router.use("/changeexcursion", putExcursion)
router.use("/deleteexcursion", deleteExcursion)
router.use("/getexcursion", getExcursion)
router.use("/addexcursion", addExcursion)
router.use("/addadmin", addAdmin)
router.use("/getAllUserAdmins", getAllUserAdmins)
router.use("/setMail", setMail)
router.use("/recoverPass", recoverPass)

module.exports = router;