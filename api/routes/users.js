const express = require ("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
 const UserController = require('../controllers/users')
router.post("/signup", UserController.user_signup)

router.post('/login',UserController.user_login);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// the get method for all users is not secure, the purpose of this is to get user's email  in postman  :)//
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/",UserController.user_get_all)////
//////////////////////////////////////////////
router.delete('/:userId',UserController.users_delete_one)

module.exports = router