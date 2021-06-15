const express=require('express');

const router=express.Router();

const shopController=require('../controller/shop.js')


router.get('/',shopController.getHome)


router.get('/search',shopController.getSearch)
router.get('/products/:category',shopController.getCategoryProducts)
router.get('/products',shopController.getProducts)

router.get('/item/:_id',shopController.getItem);


router.get('/cart',islogedin,shopController.getCart)

router.post('/cart',islogedin,shopController.addCart)

router.post('/cart-delete-item',islogedin,shopController.deleteCartItem)


router.get('/myorders',islogedin,shopController.getOrder)
router.post('/order',islogedin,shopController.addOrder)

function islogedin(req,res,next){
    if(req.session.isLoggedIn)
    {
        next();
    }
    else
    {
        req.flash('error','You are Not Logged In')
        res.redirect('/signin')
    }
}

module.exports=router