const express=require('express')
const router =express.Router();
const adminController=require('../controller/admin.js')
const Product=require('../models/product')


router.get('/add-product',islogedin,adminController.getaddProduct)

router.post('/add-product',islogedin,adminController.postaddProduct)

router.get('/update-product/:_id',islogedin,isseller,adminController.getUpdateProduct)

router.post('/update-product/:_id',islogedin,isseller,adminController.postUpdateProduct)

router.get('/delete-product/:_id',islogedin,isseller,adminController.getDeleteProduct)



function isseller(req,res,next)
{
    Product.findById({_id:req.params._id},function(err,item)
    {
        if(item.sellerid&&req.session.user&&item.sellerid.equals(req.session.user))
        {
            next();
        }
        else
        {
            req.flash('error','You Are Not Authorized');
            res.redirect('/signin');
        }
    })
}

function islogedin(req,res,next){
    if(req.session.isLoggedIn)
    {
        next();
    }
    else
    {
        req.flash('error','You Are Not Logged In')
        res.redirect('/signin')
    }
}



module.exports=router;