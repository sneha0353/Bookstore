const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema
const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    description:{
        type:String,
        maxlength:600,
        trim:true
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
       type:Number,
       default:0
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        type:String,
        required:true
    },
    likes:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            text:String,
            postedBy:{
                type:ObjectId,
                ref:"User"
            }
        }
    ],
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports = mongoose.model("Product",ProductSchema)

