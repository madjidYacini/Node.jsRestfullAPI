const express = require ("express")
const router = express.Router()

// GET METHOD OF A PRODUCTS
router.get('/', function(req , res ,next) {
     res.status(200).json({
         message :'handling a GET request to /products'
     })
}); 

// POST METHOD OF PRODUCTS

router.post('/',function (req , res ,next)  {
    res.status(201).json({
        message :'handling a POST request to /products'
    })
})
// GET METHOD OF ONE PRODUCT

router.get('/:productId',function(req,res,next){
    const id = req.params.productId
    if (id === "special"){
        res.status(200).json({
            message : " you discovred a special product",
            id: id  
        });
    }else{
        res.status(200).json({
            message : "you passed an id "
        })
    }
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