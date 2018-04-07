const express = require ("express")
const router = express.Router()
const  checkAuth = require ("../middleware/check-auth");
const OrderController = require("../controllers/orders")

// GET METHOD IN ORDERS
router.get ('/', checkAuth,OrderController.orders_get_all)

// POST METHOD IN ORDERS
router.post ('/', checkAuth ,OrderController.orders_create_order)

router.get ('/:orderID',checkAuth,OrderController.orders_get_order)
// if the order does'nt exist TODO tonight
router.delete ('/:orderID',checkAuth ,OrderController.order_delete_order)
module.exports = router  