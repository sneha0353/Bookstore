import React,{useState} from "react"
import Navbar from "./Navbar"
import {FaGratipay} from 'react-icons/fa'
import {Link,useHistory} from "react-router-dom"
import {toast,ToastContainer} from "react-toastify"
const DisplayProd=()=>{
    var val = JSON.parse(localStorage.getItem("product"))
    var use = JSON.parse(localStorage.getItem("user"))
    const [like,setLike]=useState(val.likes)
    const productId=val._id
    const [cs,setCs]=useState([val.comments])
    const [comment,setComment]=useState("")
    const history = useHistory()

      const handleClick=(id)=>{
         fetch("http://localhost:3001/api/like",{
             method:"PUT",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                productId:val._id})
         })
         .then(res=>res.json())
         .then(data=>{
                    localStorage.setItem("product",JSON.stringify(data.message))  
                    setLike(data.message.likes)
                }
             )
            
           
    }
    const handleUnclick=(id)=>{
        fetch("http://localhost:3001/api/unlike",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               productId:val._id})
        })
        .then(res=>res.json())
        .then(data=>{
            localStorage.setItem("product",JSON.stringify(data.message))  
            setLike(data.message.likes)
        })
   }
    
   const handleComment=e=>{
       e.preventDefault()
       console.log(comment)
       //molu db kholo
       fetch("http://localhost:3001/api/comment",{
           method:"PUT",
           headers:{
               "Content-Type":"application/json",
               "Authorization":"Bearer "+localStorage.getItem("jwt") 
           },
           body:JSON.stringify({
               productId:val._id,
               text:comment
           })
        
       })
       .then(res=>res.json())
       .then(cdata=>
        {
            console.log(cdata)
            localStorage.setItem("product",JSON.stringify(cdata))  
            setCs(cdata.comments)
        })
   }

   const updateproduct = () => {
       history.push('/updateproduct',{productparams:val})
   }

   const deleteproduct=()=>{

    fetch(`http://localhost:3001/api/deleteadminproduct/${productId}`,{
        method:"DELETE",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.error)
        {
            return toast(data.error,{type:"error"})
        }
        history.push("/product/admin")
        return toast(data.message,{type:"success"})
    })

   }
     
    return (
                          <div>
                           <div>
                           <ToastContainer/>
                                <Navbar />
                                <div className='container'>
                                <div className='mt-4 card' id='login'>
                                    <h1 className='mt-2 text-center text-danger' id='product'>{val.title}</h1> 
                                    
                                    {use.role===1 ? 
                                        <div className='text-center'>
                                            <span style={{marginRight:'1%'}}>
                                            <button onClick={updateproduct} className='btn btn-md btn-warning'>Edit product</button>
                                            </span>
                                            <span style={{marginRight:'1%'}}>
                                            <button onClick={()=>deleteproduct()} className='btn btn-md btn-success'>Delete product</button>
                                            </span>
                                        </div>
                                         :
                                        <div></div>
                                    }
                                    
                                    <div className='border p-2 ml-2 mr-2 bg-light'>
                                    <img src={val.photo} className='p-3 rounded' alt="hello" width='100%' style={{height:'auto'}} />
                                    <h4 className='ml-2'>
                                    <span className='text-danger'>
                                    <FaGratipay>
                                    </FaGratipay>
                                    </span> 
                                    {like.length}
                                   </h4>
                                   {like.includes(use._id)?
                                  (<i className="material-icons"
                                   onClick={handleUnclick}
                                   >thumb_down</i>)
                                   :
                                   (<i className="material-icons"
                                    onClick={handleClick}
                                    >thumb_up</i>)
                                }
                                  </div>
                                 <div className='ml-2 mt-2'>
                                 <h2 >Product Description :</h2>
                                 <h4>{val.description}</h4>
                                 </div>
                                <div className='ml-2 mt-3 '>
                                <h4>Price : <span className='text-danger'>Rs {val.price}/-</span></h4>
                                <h4 className=''>In Stock : <span className='text-danger'>{val.stock}</span></h4>
                                <h4 className=''>Sold : <span className='text-danger'>{val.sold}</span></h4>
                                </div>
                                <form>
                                <label for="co" className='ml-2'><h4>Comments</h4></label>
                                <textarea
                                style={{width:'95%',marginLeft:'1%'}}
                                id="co"
                                onChange={(e)=>setComment(e.target.value)}
                                />
                                <button className='btn btn-sm btn-info ml-2 mb-2' onClick={handleComment}>Submit Post</button>
                                </form>
                         </div>
                         <div className='container mt-2 border'>
                         {val.comments.map(item=>{
                             return (
                                 <div className='rounded bg-light mt-2' style={{display:'flex'}}>
                             <h6><span style={{fontWeight:'bold'}}>{item.postedBy.name}:</span> {item.text}</h6>
                            
                             </div>
                             )
                         })}
                         </div>
                         </div>
                        </div>
                        <div className='container'>
                        <Link to="/product/user">
                        <button
                        className="btn btn-success ml-2 mt-2"
                        >Redirect</button>
                        </Link>
                        </div>
                        </div>
    )
}

export default DisplayProd







