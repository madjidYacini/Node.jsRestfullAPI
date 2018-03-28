const express = require ("express")
const router = express.Router()
const mongoose = require("mongoose")
const Product = require("../models/product")

// GET METHOD OF A PRODUCTS
router.get('/', function(req , res ,next) {
     Product.find()
     .select(" name price _id ")
     .exec()
     .then(docs =>{
        const response = {
            count : docs.length,
            products : docs.map(doc =>{
                return {
                    name : doc.name,
                    price : doc.price,
                    _id : doc. _id,
                    GetRequest :{
                        type :"GET",
                        message: "if you want  to get all the details of this product, click the url below",
                        url :"http://localhost:3000/products/"+doc. _id
                    }
                }
            }) 
        }      
        if(docs.length >0){
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
            message : err
        })
        console.log(err)
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
        res.status(201).json({
            message :"the product is added ",
            createdProduct : {
                name :result.name,
                price : result.price,
                _id : result._id
            },
            requestOfA :{
                type :"GET",
                desc :"click the url to see all the products",
                url :"http://localhost:3000/products"
            }
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error :err 
        })
    })  
})
// GET METHOD OF ONE PRODUCT

router.get('/:productId',function(req,res,next){
    const id = req.params.productId
   Product.findById(id)
   .select("name price id")
   .exec()
   .then(doc =>{
       if (doc){  
       res.status(200).json({
            product :doc,
            request :{
                type : "GET",
                desc :"get all products", 
                url :"http://localhost:3000/products" 
            }})
       }else{
           res.status(404).json({message: "no valid entry found for provided ID"})
       }
   })
   .catch(err =>{
       console.log (err)
       res.status(500).json({error :err})
   })
})


//  PATCH METHOD OF ONE PRODUCT

router.patch('/:productId',function(req,res,next){
  const id = req.params.productId
  const updateOps ={};
  for(const ops of req.body){
    console.log(ops.propName)
    updateOps[ops.propName]=ops.value
  }
  Product.update({ _id : id},{$set : updateOps})
  .exec()
  .then(result =>{
      console.log(result)
      console.log(result )
      res.status(200).json({
          message :"prodcut updated",
         request : {
            type :"GET",
            desc :"view the product",
            url : "http://localhost:3000/products/"+id
        }
      })
  } )
  .catch(err =>{
    
      res.status(500).json({
          error : err 
      })
  })
})


//DELETE METHOD OF ONE PRODUCT 

router.delete('/:productId',function(req,res,next){
    const id = req.params.productId 
    Product.remove({ _id: id})
    .exec()
    .then(result =>{ 
        res.status(200).json ({
            message :"product removed ",
            request :{
                type :"GET",
                url : "http://localhost:3000/products/"
            }     
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
 })
module.exports = router 