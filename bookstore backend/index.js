require("dotenv").config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const {DATABASE} = require('./keys')
const cors=require("cors")
const bodyParser=require("body-parser")
const PORT = 3001
const authRoutes=require("./routes/auth")
const productRoutes=require("./routes/product")
const orderRoutes=require("./routes/order")
const userRoutes=require("./routes/user")
const stripeRoutes=require("./routes/stripepayment")


mongoose.connect(DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB CONNECTED')}
).catch(err=>console.log(err))


app.use(bodyParser.json())
app.use(cors())

app.use("/api",authRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",userRoutes);
app.use("/api",stripeRoutes);

app.listen(PORT,()=>{
    console.log(`App listening at ${PORT}`)
})