const express = require ("express")
const router = express.Router()
const multer = require ("multer")
const  checkAuth = require ("../middleware/check-auth");
const ProductController = require ("../controllers/products")
const storage = multer.diskStorage({
    destination : function (req,file ,cb){
        cb(null,"./uploads/")
    },
    filename :function(req,file,cb){
        cb (null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
         cb(null, true)
    }else{
        cb(null,false)
    }
}
const upload = multer({
    storage :storage,
    limits : {
    fileSize : 1024 * 1024 * 5
},
fileFilter :  fileFilter
})


// GET METHOD OF A PRODUCTS
router.get('/',ProductController.get_products_all); 
// POST METHOD OF PRODUCTS

router.post('/' ,checkAuth,upload.single('productImage') ,ProductController.post_product)
// GET METHOD OF ONE PRODUCT

router.get('/:productId',ProductController.get_one_product)


//  PATCH METHOD OF ONE PRODUCT

router.patch('/:productId' ,checkAuth,ProductController.patch_product)


//DELETE METHOD OF ONE PRODUCT 

router.delete('/:productId',checkAuth ,ProductController.delete_product )
module.exports = router 