const { Router } = require('express');
const router = Router();
const addExcursion = require('./addExcursion')

// const genres = require('./genres');





router.use("/addexcursion", addExcursion)

module.exports = router;
