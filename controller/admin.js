const Product=require('../models/product')

//const fetch=require("isomorphic-fetch")

exports.getaddProduct=(req,res,next)=>{
    res.render('add-product',{
        path:'/add-product'
    })
}


/*fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                for(let i=0;i<1;i++)
                {
                    data={
                        title:json[i].title,
                        price:json[i].price,
                        img:json[i].image,
                        description:json[i].description,
                        category:json[i].category,
                        sellerid:req.session.user
                    };
                    Product.create(data,function(err,data){
                       
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            console.log(data);
                        //return res.redirect('/products')
                        }
                    })
                }
            })
*/


exports.postaddProduct=(req,res,next)=>{
    req.body.sellerid=req.session.user
    Product.create(req.body,function(err,data){
        if(err)
        {
            console.log(err);
        }
        else
        {
        return res.redirect('/products')
        }
    })
    
}
exports.getUpdateProduct=(req,res,next)=>{
    Product.findById({_id:req.params._id},function(err,item){
        res.render('update-product',{
            path:'/update-product',
            product:item
        })
    })
}
exports.postUpdateProduct=(req,res,next)=>{
    Product.updateOne({_id:req.params._id},req.body,function(err,data){
        if(err)
            console.log(err);
        else
        {
            res.redirect('/products')
        }
    })
}
exports.getDeleteProduct=(req,res,next)=>{
     Product.deleteOne({_id:req.params._id},function(err){
        if(err)
            console.log(err);
        else
        {
            res.redirect('/products')
        }
    })
}