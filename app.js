const express = require("express")
const morgan = require("morgan")
const bodyParser =require ("body-parser")
const mongoose = require("mongoose")
const app = express();
const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/orders")
const userRoutes = require ("./api/routes/users")

// connect to mongo 

mongoose.connect('mongodb://node-shop:'+ process.env.MONGO_ATLAS_PW +'@node-rest-shop-shard-00-00-phleo.mongodb.net:27017,node-rest-shop-shard-00-01-phleo.mongodb.net:27017,node-rest-shop-shard-00-02-phleo.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin',{
    
})
mongoose.Promise = global.Promise
// app.use(function(req , res ,next){
//     res.status(200).json({
//         message :"it works "
//     }); 
// });

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use("/uploads",express.static('uploads'))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header ('Access-Control-Allow-Headers','Origin , X-Requested-With, Content-Type, Accept, Authorization ');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH , DELETE, GET ');
        res.status(200).json({})
    }
    next(); 
})
app.use('/products',productRoutes);
app.use('/orders',orderRoutes)
app.use('/user',userRoutes )

app.use(function(req,res,next){
    const error = new Error( "Not Found");
    error.status = 404
    next(error)
})
app.use(function(error,req,res,next){
    res.status(error.status||500);
    res.json({
        error :{
            message : error.message
        }
    })
})

module.exports = app ;