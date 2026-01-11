import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref :"User",
            required:true,
            unique:true
        },
        items: [
            {
                product :{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
                },
                
                 name:String,
                 price:{
                        type:Number,
                        required:true
                    },
                
                quantity:{
                        type:Number,
                        required:true,
                    },
                 totalItemPrice:{
                        type:Number,
                        required:true
                    }
            }
        ],
        totalQuantity:{
            type:Number,
            default:0
        },
        totalPrice:{
            type:Number,
            default:0
        }

    },
    {timestamps : true}
)

const Cart = mongoose.model("Cart",cartSchema)
export default Cart;