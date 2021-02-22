const User=require('../models/user')
const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rosie.franecki@ethereal.email',
        pass: 'XSSZMpgJM2TxrsvKWE'
    },
});
/*const transporter = nodemailer.createTransport({
    service: 'SendinBlue',
    auth: {
        user: 'lengtmp+l1kei@gmail.com',
        pass: 'gt2zyMUBa67wQWAn'
    }
});
*/
exports.getSignin=(req,res,next)=>{
 	let message = req.flash('error');
	  if (message.length > 0) {
	    message = message[0];
	  } else {
	    message = null;
	  }
	res.render('signin',{
		path:'/signin',
		errmsg:message
	})
}
exports.postSignin=(req,res,next)=>{
	User.findOne({email:req.body.email},function(err,user){
		if(err)
		{
			console.log(err)
		}
		else if(!user)
		{
			req.flash('error','Invalid email or password')
			res.redirect('/signin')
		}
		else 
		{
			bcrypt.compare(req.body.password,user.password,function(err,result){
				if(!result)
				{
					req.flash('error','Invalid email or password')
					res.redirect('/signin')
					return
				}
				else{
					req.session.isLoggedIn=true;
					req.session.user=user._id;
					res.redirect('/')
				}
			})
		}
	})
}
exports.getSignup=(req,res,next)=>{
	let message = req.flash('error');
	  if (message.length > 0) {
	    message = message[0];
	  } else {
	    message = null;
	  }
	res.render('signup',{
		path:'/signup',
		errmsg:message
	})
}
exports.postSignup=(req,res,next)=>{
	User.findOne({email:req.body.email},function(err,user){
		if(user)
		{
			req.flash('error','Email already exist')
			res.redirect('/signup')
		}
		else
		{
		bcrypt.hash(req.body.password,10,function(err,hashpass){
		req.body.password=hashpass;
		User.create(req.body,function(err,result){
			if(err)
				console.lof(err);
			else
			{
				/*transporter.sendMail({
					to:req.body.email,
					from:'giiftmp+f0mrx@gmail.com',
					subject:'registerd',
					html:'<h1>registered</h1>'
				}).catch(err=>{
					console.log(err)
				})*/
				res.redirect('/')
			}
		})	
	})}
	})
}
exports.Logout=(req,res,next)=>{
	req.session.destroy(err=>{
		if(err)
		console.log(err);
		res.redirect('/')
	})
}