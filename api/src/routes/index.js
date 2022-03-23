const { Router } = require("express");
const router = Router();

const getUsers = require("./getUsers");
const createOrder = require("./cart/createOrder");
const getOrderId = require("./cart/getOrderId");
const getAllOrders = require("./cart/getAllOrders");
const addExcursion = require('./addExcursion')
const addUsers = require('./addUsers')//////
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
const getCartUserId = require("./cart/getCartUserId");
const putStatusOrder = require("./cart/putStatusOrder");
const mp = require('./mercadopago');
const buyCompleted = require("./cart/buyCompleted");
const unbanUser = require("./unbanUser");
const deleteBuy = require("./cart/deleteBuy");
const contactMail = require("./contactMail");
const addReview = require("./reviews/addReview")
const getReviews = require("./reviews/getReviews")


router.use("/getreviews", getReviews)
router.use("/addreview", addReview)
router.use("/contactmail", contactMail)
router.use("/unbanuser", unbanUser)
router.use("/sendstatus", buyCompleted);
router.use("/cart/canceledorder", putStatusOrder);
router.use("/cart/getcartuserid", getCartUserId);
router.use("/cart/substractcart", substractCart);
router.use("/cart/addcart", addCart);
router.use("/cart/getallorders", getAllOrders);
router.use("/cart/orderpost", createOrder);
router.use("/cart/getorderid", getOrderId);
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
router.use("/mercadopago", mp)
router.use("/cart/deletebuy", deleteBuy)

module.exports = router;
