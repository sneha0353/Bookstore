const stripe=require("stripe")(process.env.SECRET_KEY)
const express=require("express")
const router=express.Router()
const {requireLogin}=require("../middleware/loginrequired")
const {v4:uuidv4}=require("uuid")


router.post("/stripepayment",(req,res)=>{

const {products,token}=req.body
console.log(products)
console.log(token)

let amount=0

products.map(item=>{
    amount=(item.product.price*item.count)+amount
})

console.log(amount)

//amount=amount*0.076854
const idempotencyKey=uuidv4()
return stripe.customers
.create({
    email:token.email,
    source:token.id
})
.then(customer=>{
    //console.log(customer)
    stripe.charges
    .create(
        {
            amount: amount*100,
            currency:"inr",
            customer:customer.id,
            receipt_email:token.email,
            description:'purchase of all items in cart'
        },{idempotencyKey}
    )
.then(result=>res.status(200).json(result))
.catch(err=>console.log(err))
})
.catch(err=>console.log('error'))
})

module.exports=router

