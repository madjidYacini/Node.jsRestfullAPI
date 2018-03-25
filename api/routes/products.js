const express = require ("express")
const router = express.Router()
const mongoose = require("mongoose")

const Product = require("../models/product")
// GET METHOD OF A PRODUCTS
router.get('/', function(req , res ,next) {
     res.status(200).json({
         message :'handling a GET request to /products'
     })
}); 

// POST METHOD OF PRODUCTS

router.post('/',function (req , res ,next)  {
   
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    product
    .save()
    .then(result =>{
        console.log(result)
    })
    .catch(err =>{
        console.log(err)
    })
    res.status(201).json({
        message :'handling a POST request to /products',
        createdProduct : product
    })
})
// GET METHOD OF ONE PRODUCT

router.get('/:productId',function(req,res,next){
    const id = req.params.productId
   Product.findById(id)
   .exec()
   .then(doc =>{
       console.log("form database",doc)
       res.status(200).json({doc })
   })
   .catch(err =>{
       console.log (err)
       res.status(500).json({error :err})
   })
})


//  PATCH METHOD OF ONE PRODUCT

router.patch('/:productId',function(req,res,next){
   res.status(200).json( {
       message : "updated product"
   })
})


//DELETE METHOD OF ONE PRODUCT 

router.delete('/:productId',function(req,res,next){
    res.status(200).json( {
        message : " DELETED PRODUCT !"
    })
 })

module.exports = router 