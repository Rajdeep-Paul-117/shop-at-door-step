const express=require('express');
const app=express();
const path=require('path');
const bodyParser = require('body-parser');
const shopRoutes=require('./routes/shop')
const adminRoutes=require('./routes/admin')
const authRoutes=require('./routes/auth')
const mongoose=require('mongoose')
const session=require('express-session')
const flash = require('connect-flash');
require('dotenv').config();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.isauthenticated = req.session.isLoggedIn;
  next();
});

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
mongoose.connect(uri,{ useUnifiedTopology: true}).then(client=>{
  console.log("db connected")
}).catch(err=>{
  console.log(err)
})



app.use(shopRoutes)
app.use(adminRoutes)
app.use(authRoutes)

app.listen(process.env.PORT||3000,()=>{
    console.log("server is running");
})