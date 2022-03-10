const { Router } = require("express");
const router = Router();

const getUsers = require("./getUsers");
const createOrder = require("./cart/createOrder");
const postOrderId = require("./cart/postOrderId");
const getOrderId = require("./cart/getOrderId");
const getAllOrders = require("./cart/getAllOrders");
const addExcursion = require('./addExcursion')
const addUsers = require('./addUsers')
const getExcursion = require('./getExcursion')
const deleteExcursion = require('./deleteExcursion');
const putExcursion = require('./putExcursion');
const changeDatesUser = require('./changeDatesUser');
const selectProduct = require('./selectProduct')
const setMail = require('./setMail')
const recoverPass = require('./recoverPass');
const deleteUser = require('./deleteUser');
const bannedUser = require('./bannedUser');
const addCart = require("./cart/addCart");
const substractCart = require("./cart/substractCart");


router.use("/cart/substractcart", substractCart);
router.use("/cart/addcart", addCart);
router.use("/cart/getallorders", getAllOrders);
router.use("/cart/orderpost", createOrder);
router.use("/cart/getorderid", getOrderId);
router.use("/cart/postorderid", postOrderId);
router.use("/banuser", bannedUser)
router.use("/changedatesUser", changeDatesUser)
router.use("/changeexcursion", putExcursion)
router.use("/deleteexcursion", deleteExcursion)
router.use("/getexcursion", getExcursion)
router.use("/addexcursion", addExcursion)
router.use("/addUsers", addUsers)
router.use("/selectProduct", selectProduct)
router.use("/setmail", setMail)
router.use("/recoverPass", recoverPass)
router.use("/deleteaccount", deleteUser)
router.use("/getusers", getUsers);


module.exports = router;
