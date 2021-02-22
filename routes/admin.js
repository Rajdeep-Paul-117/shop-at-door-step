const express=require('express')
const router =express.Router();
const adminController=require('../controller/admin.js')



router.get('/add-product',adminController.getaddProduct)

router.post('/add-product',adminController.postaddProduct)

router.get('/update-product/:_id',adminController.getUpdateProduct)

router.post('/update-product/:_id',adminController.postUpdateProduct)

router.get('/delete-product/:_id',adminController.getDeleteProduct)

module.exports=router;