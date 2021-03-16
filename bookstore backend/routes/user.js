const express = require('express')
const { requireLogin } = require('../middleware/loginrequired')
const User = require('../models/user')
const router = express.Router()

router.put('/follow/:userId',requireLogin,(req,res)=>{
    const finaldata = {}
    User.find({_id:req.params.userId})
    .then(user=>{
        if(!user)
        {
            return res.status(404).json({
                error:"opps user not found"
            })
        }
        if(req.user._id==req.params.userId){
            return res.json({
                message:'you cannot follow yourself!'
            })
        }

        User.findByIdAndUpdate({_id:req.user._id},{
            $push:{following:user}
        },{new:true}
        ).then(user => {
            finaldata.user = user
        })

        /*user.followers.push(req.user)
        finaldata.otheruser = user*/

        User.findByIdAndUpdate({_id:req.params.userId},{
            $push:{followers:req.user}
        },{new:true}
        ).then(user => {
            finaldata.otheruser = user
            return res.json(finaldata)
        })
        
    })
    .catch(err=>console.log(err))
})

router.put("/unfollow/:userId",requireLogin,(req,res)=>{
    const deletedata={}
    User.findById({_id:req.params.userId})
    .then(user=>{
        if(!user)
        {
            return res.status(404).json({
                error:"user not found"
            })
        }
           if(req.user._id==user._id)
           {
               return res.status(500).json({
                   error:"you cannot unfollow urself"
               })
           }
           User.findByIdAndUpdate({_id:user._id},{
               $pull:{followers:req.user._id}
           },{new:true})
           .then(data=>{
               deletedata.otheruser=data
           })

           User.findByIdAndUpdate({_id:req.user._id},{
               $pull:{following:user._id}
           },{new:true})
           .then(data=>{
               deletedata.user=data
               return res.json(deletedata)//eko
           })
    })
})

router.get("/getuserdetails",requireLogin,(req,res)=>{
        return res.json({profile:req.user})
})

router.get('/allusers',requireLogin,(req,res)=> {
    User.find()
        .exec((err,result)=> {
            if(err){
                return res.json({
                    error:err
                })
            }
            res.json(result)
        })
})



module.exports = router

