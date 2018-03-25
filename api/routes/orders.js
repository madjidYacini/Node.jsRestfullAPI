const express = require ("express")
const router = express.Router()

// GET METHOD IN ORDERS
router.get ('/', function(req ,res , next){
    res.status(200).json({
        message : "get the orders "
    })
})

// POST METHOD IN ORDERS
router.post ('/', function(req ,res , next){
    const order ={
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message : "post the orders ",
        order :  order
    })
})


router.get ('/:orderID', function(req ,res , next){
    const id = req.params.orderID
    res.status(200).json({
        message : "details of an order ",
        ID : id
    })
})


router.delete ('/:orderID', function(req ,res , next){
    const id = req.params.orderID
    res.status(200).json({
        message : " order deleted",
        ID : id
    })
})


module.exports = router  