const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    profilepic:{
        type:String,
        default:'https://worldbusinessfitness.com/wp-content/uploads/2018/06/opulent-profile-square-06.jpg'
    },
    followers:[{
        type:ObjectId,
        ref:"User"
    }],
    following:[{
        type:ObjectId,
        ref:"User"
    }]
},{timestamps:true})

module.exports=mongoose.model("User",UserSchema);
