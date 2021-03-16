import React,{useEffect,useState} from "react"
import {Link,useHistory} from "react-router-dom"
import Navbar from "./Navbar"
import {toast,ToastContainer} from "react-toastify"
import StripeCheckout from "react-stripe-checkout"

const Order=()=>{
    const history=useHistory()
    const [datas,setDatas]=useState("")
    const orderval=JSON.parse(localStorage.getItem("order"))
    const val=JSON.parse(localStorage.getItem("user"))
    const[amounts,setAmounts]=useState(0)
    
    useEffect(()=>{
        const orderval=JSON.parse(localStorage.getItem("order"))
        if(orderval == null)
        {
            toast("no items in cart",{type:"error"})
        }
        else{
        fetch(`http://localhost:3001/api/getorders/${orderval._id}/${val._id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(data=>{
            //localStorage.setItem("order",JSON.stringify(data))
            console.log(data)
            setDatas(data)
            var amt = 0
            data.products.map(item=>(
                amt = amt+(item.product.price)*item.count
               // amount=amount+(toInt(item.product.price)*item.count)
            ))
            console.log(amt)
            setAmounts(amt)
        })
    }
    },[val._id])

    const deleteProduct=item=>{

        fetch(`http://localhost:3001/api/deleteproduct/${datas._id}/${datas.user._id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+localStorage.getItem("jwt")
            },
           body:JSON.stringify({
               products:item})
        })
        .then(res=>res.json())
        .then(data=>
            {
                console.log(data)
                localStorage.setItem("order",JSON.stringify(data))
                history.push("/order")

            fetch(`http://localhost:3001/api/getorders/${orderval._id}/${val._id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(data=>{
            //console.log(data)
            setDatas(data)
            var amt = 0
            data.products.map(item=>(
                amt = amt+(item.product.price)*item.count
               // amount=amount+(toInt(item.product.price)*item.count)
            ))
            console.log(amt)
            setAmounts(amt)
            
        })

            })
    }

    const makepayment = token => {
        const body = {
            token,
            products:datas.products
        };
        const headers = {
            "Content-Type":'application/json',
            Authorization:"Bearer "+localStorage.getItem('jwt')
        };
        return fetch('http://localhost:3001/api/stripepayment',{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        })
        .then(res => {
            console.log("RESPONSE",res)
            const {status} = res
            console.log("STATUS",status)
            if(status===200)
            {
                toast(`payment successful of Rs ${amounts}`,{type:"success"})
                fetch("http://localhost:3001/api/updatestock",{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:localStorage.getItem('jwt')
                    },
                    body:JSON.stringify({
                      products:orderval.products  
                    })
                })
                .then(res=>res.json())
                .then(data=>console.log(data))
                return fetch(`http://localhost:3001/api/order/${orderval._id}`,{
                    method:'DELETE',
                    headers:{
                        Authorization:'Bearer '+localStorage.getItem('jwt')
                    }
                }).then(res => res.json())
                .then(result=>{
                    console.log(result)
                    setDatas("")
                    return localStorage.removeItem("order")
                })
                .catch(err => console.log(err))
            }
        })
        .catch(error=>console.log(error))
    }
    
   
    return (
        <div> 
        <Navbar/>
        <ToastContainer/>
        {datas==="" ?
            <div className='container mt-4'>
            <h4 id='font' className='mb-4 text-center'><b>No Orders yet continue shopping!</b></h4>
            <Link to="/product/user" className='text-white' style={{textDecoration:'none'}}>
                <button id='font' className='btn btn-info btn-block'>
                    Redirect
                </button>
            </Link>
        </div>
            : 
            <div>
            {datas.products ? 
                <div>
                {datas.products.length===0
                    ? 
            
                    <div className='container mt-4'>
                        <h4 id='font' className='mb-4 text-center'><b>No Orders yet continue shopping!</b></h4>
                        <Link to="/product/user" className='text-white' style={{textDecoration:'none'}}>
                            <button id='font' className='btn btn-info btn-block'>
                                Redirect
                            </button>
                        </Link>
                    </div>
                    
                    :
            
                    <div id='font'>
                    <h2 className='text-center mt-4'>{datas.user ? datas.user.name+"'s Order" : "loading"}</h2>
                    <h4 className='mb-4 text-center'>Status: <span className='text-danger'>{datas.status}</span> at {Date(datas.createdAt)}</h4>
                        <div className='container mt-2 p-2' >
                          
                            {datas.products ? 
                                <div className='mb-2'>
                                    {datas.products.map(item => {
                                        return(
                                        <div className='bg-light p-4 mb-4 border rounded'>
                                            <img className='rounded' src={item.product.photo} alt="uu" style={{width:'100%'}} />
                                            <h4 className='text-center' key={item._id}>{item.product.title}</h4>
                                            <h4>Price: <span className='text-danger'>Rs {item.product.price}/-</span></h4>
                                            <h4>Stock: <span className='text-danger'>{item.product.stock} pcs</span></h4>
                                            <h4>Quantity: <span className='text-danger'>{item.count} pcs</span></h4>
                                            <button className='btn btn-outline-danger mt-2' onClick={()=>deleteProduct(item)}>Delete</button>
                                        </div>
                                        )
                                    })}
                                    <h4>Amount total : {amounts}</h4>
                                    <StripeCheckout 
                                    stripeKey="pk_test_51GcmgFDcPw0smdjayD0gm2HbQxzj6Ejaw4WTUktQ1ce5qir9o3UiTm73iNde7CKDkCEdEeG9Cf8eyhoIkZIgFlKy00hWOnPgur"
                                    token={makepayment}
                                    name="Buy Books"
                                    amount={amounts*100}
                                    currency="inr"
                                    //billingAddress=""
                                    //shippingAddress=""
                                    />
                                </div> 
                                :
                                "loading"
                            }
                         
                            <Link to="/product/user" className='text-white' style={{textDecoration:'none'}}>
                            <button className='btn btn-info btn-block'
                            >
                            Redirect
                            </button>
                            </Link>
                          
                        </div>
                        </div>
                    }
                </div> : 
                
                "loading"
            }
        </div>
        } 
        </div>
    )
}


export default Order


