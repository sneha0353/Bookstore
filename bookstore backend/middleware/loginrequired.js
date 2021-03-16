const jwt = require('jsonwebtoken')
const {SECRET} = require('../keys')
const User = require('../models/user')
const mongoose = require('mongoose')

exports.requireLogin= (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        res.status(404).json({message:'U need to login first!'})
    }
    const token = authorization.replace('Bearer ',"")
    jwt.verify(token,SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:'U must be logged in!'})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
    })
}

exports.isAdmin = (req,res,next) => {
       const role=req.user.role //kar rhe kaam
       if(role===0)
       {
        return res.status(403).json({
            error:"Yor are not ADMIN"
       })
    }
     next();
}

//module.exports=router//lkin router use ni ha jaha import krege wha user ka role set kiye na to req.user.role hoga kya?ha ho sakta rukk