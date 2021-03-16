const express = require('express')
const router = express.Router()
const {Order}=require('../models/order')
const User=require("../models/user")
const {requireLogin,isAdmin} = require("../middleware/loginrequired")

router.post('/createorder/:userId',requireLogin,(req,res)=>{ 

        const user=req.user
        user.password=undefined
        user.role=undefined
        const {products,count}=req.body
        const order=new Order({
            products,
            count,
            user
        });
        order.save((err,order)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"failed to create order"
                })
            }
            return res.json(order)
        })
    })
router.post('/createorder',requireLogin,(req,res)=>{
    req.body.order.user=req.user;
    const order=new Order(
        {products:req.body.order});
    order.save((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                error:"failed to create order"
            })
        }
         return res.json(order)
    })
})

router.get('/getorderstatus/:orderId/:userId',requireLogin,(req,res)=>{
    Order.findById({_id:req.params.orderId})
    .then(order=>{
        if(!order)
        {
            return res.status(400).json({
                error:"order id not found"
            })
        }
        return res.json(order.status)
    })
    .catch(err=>console.log(err)) 
})

router.delete('/order/:orderId',requireLogin,(req,res)=>{
    Order.findByIdAndDelete({_id:req.params.orderId})
        .then(resp=>{
            console.log(resp)
            return res.json(resp)
        }).catch(err=>{
            console.log(err)
            console.log(err)
        })
})

router.put('/updateorderstatus/:orderId/:userId',requireLogin,isAdmin,(req,res)=>{
    Order.findByIdAndUpdate({_id:req.params.orderId},
        {$set:
            {status:req.body.status}
        },
        {new:true},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"unable to update status"
                })
            }
           return res.json(order)
        }
    )
})


router.put("/addproduct/:orderId/:userId",requireLogin,(req,res)=>{
    const {products,amount,count}=req.body
    Order.findByIdAndUpdate({_id:req.params.orderId},
        {
            $push:{products:products}
        },
        {new:true}
    )
    .exec( (err,result)=>{
        if(err)
        {
            return res.status(404).json({
                error:err
            })
        }

        return res.json(result)
    })
})

router.put("/deleteproduct/:orderId/:userId",requireLogin,(req,res)=>{
    const {products}=req.body
    Order.findByIdAndUpdate({_id:req.params.orderId},
        {
            $pull:{products:products}
        },
        {new:true}
    )
    .exec( (err,result)=>{
        if(err)
        {
            return res.status(404).json({
                error:err
            })
        }
        return res.json(result)
    })
})

router.get("/orders",requireLogin,(req,res)=>{
    Order.findOne({user:req.user._id})
    .then(data=>{
        if(!data)
        {
            return res.status(404).json({
                error:"order not found"
            })
        }
        return res.json(data)
    })
})


router.get("/getorders/:orderId/:userId",requireLogin,(req,res)=>{
    Order.findOne({_id:req.params.orderId})
    .populate("products.product","title price stock photo")
    .populate("user","_id name email")
    .then(order=>{
        if(!order)
        {
            return res.status(404).json({
                error:"sorry order not placed"
            })
        }
        return res.json(order)
    })
    .catch(err=>console.log(err))
})
module.exports = router

