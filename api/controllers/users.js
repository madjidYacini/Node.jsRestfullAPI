const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');


exports.user_signup =(req,res,next)=>{
    User.find({email : req.body.email})
    .exec()
    .then(user =>{
        if(user.length >=1 ){
            console.log(user )
           return res.status(409).json({
                message :"user already exists"
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({
                        error :err
                    })
                }else{
                    const user = new User({
                        _id : mongoose.Types.ObjectId(),
                        email : req.body.email,
                        password: hash 
                    })
                    user
                    .save()
                    .then(result =>{
                        console.log(result)
                        res.status(200).json({
                            message :"user created",
                            user : result.email
                        })
                    })
                    .catch(err =>{
                        res.status(500).json({
                            error : err
                        })
                    })
                }
            })
        }
    })
    .catch(err =>{
        res.status(500).json({
            error :err
        })
    })
    
 
}

exports.user_login = (req,res,next)=>{
    User.find({email :req.body.email})
    .exec()
    .then(user =>{
        if (user.length <1){
            return res.status(401).json({
                message :"auth failed",
                
            })
        }
        bcrypt.compare(req.body.password,user[0].password, (error , result)=>{
            if (error  ){

                return res.status(401).json({
                    message :"auth failed",
                    error : error 
                }) ;
            }
            if (result){
               const token = jwt.sign({
                    email: user[0].email,
                    userId : user[0]._id
                },
                 process.env.JWT_KEY,
                 {
                     expiresIn : "1h"
                 }
                );
                return res.status(200).json({
                    message :"auth successful", 
                    token : token
                })
            }
            return res.status(401).json({
                message :"auth failed",
                
            })
        })
    })
    .catch(err =>{
         console.log(err)
         res.status(500).json({
            error :err
            })
        })
    }


    exports.user_get_all = (req,res,next)=>{
        User.find()
        .select("email _id password")
        .exec()
        .then(users =>{
            const response = {
                count : users.length,
                products : users.map(user =>{
                    return {
                        _id : user._id,
                        email : user.email,
                        password : user.password,
                        
                        
                    }
                    
                }) 
            }
            if(users.length >0){
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
                error :err
            })
        })
    }

    exports.users_delete_one =(req ,res, next)=>{
        User.findById(req.params.userId)
        .exec()
        .then(result =>{
            console.log(result)
            if(!result){
                res.status(404).json({
                    message:"user not found"
                })
            }else{
                User.remove({ _id: req.params.userId})
                .exec()
                .then(result =>{
                   
                    res.status(200).json({
                        message :"user deleted",
                        request :{
                            type :"GET",
                            url :"http://localhost:3000/user"
                        }
                    })
                
                })
                   
                .catch(err =>{
                    console.log(error)
                    res.status(500).json({
                        error :err
                    })
                }) 
            }
        })
    
       
    }