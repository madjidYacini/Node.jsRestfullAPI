const express = require ("express")
const router = express.Router()
const mongoose = require("mongoose");
const Order = require("../models/order")
const Product = require ("../models/product")
// GET METHOD IN ORDERS
router.get ('/', function(req ,res , next){
    Order.find()
    .select("_id product quantity")
    .exec()
    .then(orders =>{
        const response = {
            count : orders.length,
            products : orders.map(order =>{
                return {
                
                    quantity : order.quantity,
                    _id : order._id, 
                    Request :{
                        type :"GET",
                        message: "if you want  to get all the details of this product, click the url below",
                        url :"http://localhost:3000/orders/"+order._id
                    }
                }
                
            }) 
        }
        if(orders.length >0){
            res.status(200).json({
                document : response
            })
           }else{
               res.status(200).json({
                   message :"there is no object to display"
               })
           }      
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })
})

// POST METHOD IN ORDERS
router.post ('/', function(req ,res , next){
    Product.findById(req.body.product)
    .then(result =>{
        if(!result  ){
            return res.status(400).json({
                message : "product doesn't exist in database"
            })
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product :req.body.product
        } )
      
        .save()
        .then(result =>{
           
            console.log(result)
            res.status(201).json({
                message :"product added to  the order",
                product : result,
                Request :{
                    type :"GET",
                    message: "if you want  to get all the details of this product, click the url below",
                    url :"http://localhost:3000/orders/"+result.product
                }
            })
         
        })
    
        .catch(err =>{
          res.status(500).json({
               message :err
          })
        }) 
    })
    .catch(err =>{
        res.status(500).json({
            err : err,
            message :"product not found"
        })
    })
    
  

     
})


router.get ('/:orderID', function(req ,res , next){
    const id = req.params.orderID
    Order.findById(id)
    .exec()
    .then(order =>{
        console.log(order)
        if(!order ){
            res.status(400).json({
                message : "not found"
            })
        }
        res.status(200).json({
            message :" order found",
            order : order,
            request:{
                type :"GET",
                url :"http://localhost:3000/orders"
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
        error :err
            
        })
    })
})
// if the order does'nt exist TODO tonight
router.delete ('/:orderID', function(req ,res , next){
    const id = req.params.orderID
    Order.findById(id)
    .exec()
    .then(result =>{
        console.log(result)
        if(!result){
            res.status(404).json({
                message :"not found this order to delete it"
            })
        }
        Order.remove( {_id : req.params.orderID})
        .exec()
        .then(order =>{
          
            res.status(201).json({
                message :"order deleted ",
                request :{
                    type :"GET",
                    url :"http://localhost:3000/orders"
                }
            })
        })
        .catch(err =>{
            res.status(500).json({
                error : err
            })
        })

    })
   
})
module.exports = router  