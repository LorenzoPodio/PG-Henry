const { Router } = require('express');
const router = Router();
const addExcursion = require('./addExcursion')
const addUsers = require('./addUsers')
const getExcursion = require('./getExcursion')
const deleteExcursion = require('./deleteExcursion');
const putExcursion = require('./putExcursion');
const changeDatesUser = require('./changeDatesUser');

const setMail = require('./setMail')
const recoverPass = require('./recoverPass')

router.use("/changedatesUser", changeDatesUser)
router.use("/changeexcursion", putExcursion)
router.use("/deleteexcursion", deleteExcursion)
router.use("/getexcursion", getExcursion)
router.use("/addexcursion", addExcursion)
router.use("/addUsers", addUsers)

router.use("/setmail", setMail)
router.use("/recoverPass", recoverPass)

module.exports = router;