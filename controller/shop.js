const Product=require('../models/product');
const User=require('../models/user')
exports.getHome=(req,res,next)=>{
    res.render('home',{
        path:'/'
    })
}

exports.getProducts=(req,res,next)=>{
    Product.find({},function(err,data){
        if(err)
        {
            console.log(err)
            return;
        }
        else
        {
            res.render('products',{
            productTitle:"All Products",
            products:data,
            path:'/products'
            })
        }
    }
)}

exports.getItem=(req,res,next)=>{
    Product.findById({_id:req.params._id},function(err, item)
    {
        if(err)
        {
            console.log(err);
            return;
        }
        res.render('item',{
            item:item,
            path:req.params._id
        })
    })
}
exports.getCart=(req,res,next)=>{
     User.findOne({_id:req.session.user}).populate('cart.items.productId').exec((err,products)=>{
        if(err)
            console.log(err)
        else{
            products=products.cart.items
            res.render('cart',{
                path:'/cart',
               products:products
            })
        }
     })
}
exports.addCart=(req,res,next)=>{
    User.findOne({_id:req.session.user},function(err,user)
    {
        if(err)
            console.log(err)
        else
        {
            const newcart=[...user.cart.items];
            const itemindex=newcart.findIndex(item=>{
                return item.productId.toString()===req.body.productId.toString();
            })
            if(itemindex>=0)
            {
                if(req.body.quantity)
                {
                    newcart[itemindex].quantity=req.body.quantity
                }
                else
                newcart[itemindex].quantity+=1;
            }
            else
            {
                newcart.push({
                    productId:req.body.productId,
                    quantity:1
                })
            }
            user.cart.items=newcart
            user.save()
            res.redirect('/cart')
        }
    })
}

exports.deleteCartItem=(req,res,next)=>{
    User.findOne({_id:req.session.user},function(err,user){
        if(err)
            console.log(err);
        else
        {
            const newcart=user.cart.items.filter((item)=>{
                return item.productId.toString()!=req.body.productId.toString();
                })
            user.cart.items=newcart;
            user.save();
            res.redirect('/cart');
        }
    })

}