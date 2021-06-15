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
    category:{
        type:String,
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
    },
    sellerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})
ProductSchema.index({'$**':'text'})
module.exports=mongoose.model("Product",ProductSchema)
