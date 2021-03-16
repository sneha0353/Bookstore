import React,{useState,useEffect,useContext} from 'react'
import Navbar from './Navbar'
import {useHistory} from "react-router-dom"
import TodoContext from "../context/Context"
import {ADD_PRODUCT} from "../context/action.types"

const Product = () => {
    
    var {dispatch}=useContext(TodoContext)
    const[count,setCount]=useState(1)
    const [prod,setProd]=useState([])
    const user=JSON.parse(localStorage.getItem("user"))
    const history=useHistory()
     useEffect(()=>{
        
        fetch("http://localhost:3001/api/getallproducts",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setProd(data)
        })
     },[])

     const onPlaceMake=product=>{
         
        dispatch({
            type:ADD_PRODUCT,
            payload:product
              })
        localStorage.setItem("product",JSON.stringify(product))
        history.push("/productdetail")
     }
     
    

    const handleOrder=(product)=>{
        var vv=JSON.parse(localStorage.getItem("order"))
        if(vv == null)
        {
            fetch(`http://localhost:3001/api/createorder/${user._id}`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        products:[{product,count}]
                       // count
                    })
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    localStorage.setItem("order",JSON.stringify(data))
                    setCount(1)
                    history.push("/order")
                })
        }
        else{
            fetch(`http://localhost:3001/api/addproduct/${vv._id}/${user._id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    products:[{product,count}]
                    //count
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                localStorage.setItem("order",JSON.stringify(data))
                setCount(1)
                history.push("/order")
            })
                
            }
    }
    
    
    return(
        <div>
        <Navbar />
        <div className='mt-5 container text-center'>
        <div className='d-flex row justify-content-around text-center'>
            {prod.map(product=>(
                <div className='mb-4 col-md-4 ' 
                key={product._id}
                style={{justifyContent:'center'}}>
                <div className='card'>
                <h1 className='mt-2' id='product'>{product.title}</h1>
                <img className='p-2 rounded' src={product.photo} alt="rr" width='100%' style={{height:'250px'}} />
                <label for="count">Quantity</label>
                <input type="number"
                 id="count" min="0" max={product.stock}
                 required
                 onChange={e=>setCount(e.target.value)}
                 />
                <div className='d-flex row justify-content-around text-center'>
                <button className='col-md-4 m-2 btn btn-warning' 
                onClick={()=>onPlaceMake(product)}
                >
                 Details
                </button>
                
                <button className='col-md-4 m-2 btn btn-success'
                onClick={()=>handleOrder(product)}
                >Buy Now</button>
                </div>
                </div>
                </div>
            ))}
        </div>
        </div>
        </div>

    )
}

export default Product;