
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
    name : {
     type:String,
     required:true,
     trim:true,
    lowercase:true,
     minLength:3,
     maxLength:30,
     immutable:false,   
    },
    category:{
        type: String,
        required :true,
        trim:true,
        lowercase:false,
        minLength:3,
        maxLength:30
    },
    brand:{
        type:String,
        required:true,
        trim:true,
        lowercase:false,
        minLength:3,
        maxLength:30
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:0
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
},
    {
        timestamps:true
    }
)
   

const Product = mongoose.model("Product",productSchema)
export default Product;