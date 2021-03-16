const express = require('express');
const router = express.Router()
const mongoose = require("mongoose")
const {requireLogin,isAdmin}=require("../middleware/loginrequired")
const Product = require("../models/product")
const User = require("../models/user")

router.post('/createproduct',requireLogin,isAdmin,(req,res)=> {
    const {title,description,price,photo,stock} = req.body
    if(!title||!description||!price){
        return res.status(404).json({
            error:'Enter required fields'
        })
    }
    const newproduct = new Product({
        title,
        description,
        price,
        photo,
        stock
    })
    newproduct.save()
        .then(product=>{
            return res.json({
                product
            })
        })
        .catch(err=>{
            console.log(err)
        })
})

router.put('/updateproduct/:productid',requireLogin,isAdmin,(req,res)=>{
      
    if(!req.body.photo)
    {
        return res.status(400).json({
            error:"err plz enter the photo"
        })
    }
   
    Product.findByIdAndUpdate({_id:req.params.productid},
        {$set:
            {photo:req.body.photo,
            title:req.body.title,
            price:req.body.price,
            stock:req.body.stock,
            description:req.body.description,
          }
        },
        {new:true},
       (err,result)=>{
        if(err){
           return res.status(404).json({
                error:'cannot post photo!'
            })
        }
        return res.json({
            result
        })
    })
})

router.put("/like",requireLogin,(req,res)=>{
    Product.findByIdAndUpdate(req.body.productId,{
      $push:{likes:req.user._id}
    },
    {new:true}
    )
    .exec((err,result)=>{
        if(err){
            return res.status(404).json({
                error:'error in liking the post!'
            })
        }
       return res.json({
            message:result
     })
     })
})

router.put("/unlike",requireLogin,(req,res)=>{
    Product.findByIdAndUpdate(req.body.productId,{
      $pull:{likes:req.user._id}
    },
    {new:true}
    )
    .exec((err,result)=>{
        if(err){
            return res.status(404).json({
                error:'error in liking the post!'
            })
        }
        return res.json({
            message:result
     })
     })
})

router.put("/comment",requireLogin,(req,res)=>{
     const comment={
         text:req.body.text,
         postedBy:req.user._id
     }
     Product.findByIdAndUpdate(req.body.productId,{
         $push:{comments:comment}
     },
     {new:true})
     .populate("comments.postedBy","_id name")
     //.populate("postedBy","_id name")
     .exec((err,result)=>{
         if(err)
         {
             return res.status(422).json({
                 error:"failed to post"
             })
         }
         else{
             return res.json(result)
         }
     })
})

router.get('/productdetails/:productId',requireLogin,(req,res)=>{
    Product.findById({_id:req.params.productId})
        .then(product=>{
            if(!product){
                return res.status(404).json({
                    message:'Product not found!'
                })
            }
            return res.json(product)
        }).catch(err=>{
            console.log(err)
        })
})

router.get('/getallproducts',requireLogin,(req,res)=>{
    Product.find()
     .populate("comments.postedBy","_id name")
        .then(products=>{
            return res.json(products)
        })
        .catch(err=>{
            console.log(err)
        })
})


router.put('/updatestock',requireLogin,(req,res)=>{
    //console.log(req.body.products)
    let operation=req.body.products.map(prod=>{
        return {
            updateOne:{
                "filter":{"_id":prod.product},
                "update":{$inc:{"stock":-prod.count,"sold":prod.count}}
            }
        }
    })
    console.log(operation[0]);
    Product.bulkWrite(operation,{},(err,prods)=>{
        if(err)
        {
            return res.status(400).json({
                error:"BULK operation failed"
            })
        }
        //console.log(prods)
        return res.json(prods)
    })
})

router.delete("/deleteadminproduct/:productId",requireLogin,isAdmin,(req,res)=>{
    Product.findByIdAndDelete({_id:req.params.productId})
    .then(prod=>{
        if(prod)
        {
            return res.json({
                message:"product successfully deleted"
            })
        }
        return res.status(404).json({
            error:"not found"
        })
    })
    .catch(err=>console.log(err))
})

module.exports = router
