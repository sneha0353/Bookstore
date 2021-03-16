const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const ProductCartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
     name:String,
     price:Number,
    count:{
        type:Number,
        required:true,
        default:0
    }
})

const ProductCart=mongoose.model("ProductCart",ProductCartSchema)
const OrderSchema=new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:Number,
    address:String,
    status:{
        type:String,
        default:"Received",
        enum:["Cancelled","Shipped","Received","Processing","Delivered"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Order=mongoose.model("Order",OrderSchema)
module.exports={ProductCart,Order}


