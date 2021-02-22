const express=require('express');

const router=express.Router();

const shopController=require('../controller/shop.js')

router.get('/',shopController.getHome)

router.get('/products',shopController.getProducts)

router.get('/item/:_id',shopController.getItem);


router.get('/cart',shopController.getCart)

router.post('/cart',shopController.addCart)

router.post('/cart-delete-item',shopController.deleteCartItem)

module.exports=router