const { Router } = require('express');
const router = Router();
const addExcursion = require('./addExcursion')
const addAdmin = require('./addAdmin')
// const genres = require('./genres');





router.use("/addexcursion", addExcursion)
router.use("/addadmin", addAdmin)
module.exports = router;
