const express=require('express')
const router=express.Router();

const authController=require('../controller/auth.js')

router.get('/signin',authController.getSignin)

router.post('/signin',authController.postSignin)

router.get('/signup',authController.getSignup)

router.post('/signup',authController.postSignup)

router.get('/logout',authController.Logout)

module.exports=router;