const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User=require("../models/user")
const jwt=require("jsonwebtoken")
const {SECRET}=require("../keys")
const {requireLogin,isAdmin}=require("../middleware/loginrequired")

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
        
    User.findOne({email:email})
        .then(user => {
            if(user){
               return res.status(404).json({error:'User already exist!'})
            }
            const newuser = User({
                name,
                email,
                password
            })
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newuser.password,salt,(err,hash)=>{
                    if(err)throw err;
                    newuser.password=hash;
                    newuser.save()
                    .then(user => {
                    res.json({message:'Saved Successfully!'})
                     })
                    .catch(err => {
                    console.log(err)
                   })
                })

            })             
        }).catch(err => console.log(err))
})

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user => {
            if(!user){
                return res.status(404).json({error:'Invalid email and password!'})
            }
             bcrypt.compare(req.body.password,user.password)
                .then(valid=>{
                    if(valid){
                        const token=jwt.sign({_id:user._id},SECRET)
                        const {_id,name,email,role,followers,following,profilepic}=user
                       return res.json({token,user:{_id,name,email,role,followers,following,profilepic}})
                    }else{
                       return res.json({error:'Invalid email and password'})
                    }
                })
                .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
})

router.get("/signout",(req,res)=>{
    res.clearCookie("token");
    return res.json({
        message:"User signout successfully"
    })
})

//route for user details
router.get("/user/:id",requireLogin,(req,res)=>{
    User
    .findOne({_id:req.params.id})
    .select("-password -role")
    .then(user=>{
        req.user.role=undefined
       return res.json(user)
    })
    .catch(err=>console.log(err))
})
module.exports = router
