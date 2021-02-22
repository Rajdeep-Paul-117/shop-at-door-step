const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const ProductSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        require:true,
        trim:true
    },
    img:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    }
})

module.exports=mongoose.model("Product",ProductSchema)
