const Product=require('../models/product');
const { findOne } = require('../models/user');
const User=require('../models/user')


exports.getSearch=(req,res,next)=>{
    Product.find({$text:{$search:req.query.text}},function(err,data){
        if(err)
        {
            console.log(err)
            return;
        }
        else
        {        
            let message = req.flash('success');
            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }
            res.render('products',{
            productTitle:"All Products",
            products:data,
            path:'/products',
            succmsg:message
            })
        }
    })
}

exports.getHome=(req,res,next)=>{
    Product.distinct('category',function(err,data){
        if(err)
        {
            console.log(err)
            return;
        }
        else
        {
            ( async()=>{ 
                let im=[]
                for(let i=0;i<data.length;i++){
                    await Product.findOne({category:data[i]},function(err,val){
                        im.push(val.img)
                    })
                }
                res.render('home',{
                    path:'/',
                    category:data,
                    image:im
                })
            })()  
        }
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
            let message = req.flash('success');
            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }
            res.render('products',{
            productTitle:"All Products",
            products:data,
            path:'/products',
            succmsg:message
            })
        }
    })
}
exports.getCategoryProducts=(req,res,next)=>{
    Product.find({category:req.params.category},function(err,data){
        if(err)
        {
            console.log(err)
            return;
        }
        else
        {
            let message = req.flash('success');
            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }
            res.render('products',{
            productTitle:"All Products",
            products:data,
            path:'/products',
            succmsg:message
            })
        }
    })
}

exports.getItem=(req,res,next)=>{
    Product.findById({_id:req.params._id},function(err, item)
    {
        if(err)
        {
            console.log(err);
            return;
        }
        let isSeller=false;
        if(item.sellerid&&req.session.user&&item.sellerid.equals(req.session.user))
            isSeller=true;

        res.render('item',{
            item:item,
            path:req.params._id,
            isSeller
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
            req.flash('success','Added To Cart Successfully')
            res.redirect('back')
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
exports.getOrder=(req,res,next)=>{
    User.findOne({_id:req.session.user}).populate('orders.items.productId').exec((err,customer)=>{
        if(err)
        console.log(err);
        else
        {
            let message = req.flash('success');
            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }
            res.render('orders',{
                path:'/myorders',
                products:customer.orders.items,
                succmsg:message
            })
        }
    })
}
exports.addOrder=(req,res,next)=>{
    User.findOne({_id:req.session.user},function(err,user){
        if(err)
            console.log(err)
        else
        {
            const order=[...user.orders.items];
            const neworderitems=[...user.cart.items];
            for(let i=0;i<neworderitems.length;i++)
            order.push(neworderitems[i])
            user.cart.items=[];
            user.orders.items=order;
            user.save()
            req.flash('success','Your order has been placed successfully')
            res.redirect('/myorders')
        }
    })
}
