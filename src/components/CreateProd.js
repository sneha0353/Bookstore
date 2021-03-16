import React, { useState,useEffect } from 'react'
import Navbar from './Navbar'
import {useHistory} from 'react-router-dom'

const CreateProduct = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [photo,setPhoto] = useState("")
    const [stock,setStock] = useState("")
    const [url,setUrl] = useState("")

    useEffect(()=>{
        if(url)
        {
        fetch('http://localhost:3001/api/createproduct',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                title,
                description,
                price,
                photo:url,
                stock
            })    
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                alert("error")
            }
            else{
                alert("success")
                history.push("/product/admin")
            }
        })
        .catch(err=>console.log(err))
    }
},[url,description,price,history,stock,title])
    
      const Post=()=>{
          const data=new FormData()
          data.append("file",photo)
          data.append("upload_preset","hellouse")
          data.append("cloud_name","sneha0353")
          fetch("https://api.cloudinary.com/v1_1/sneha0353/image/upload",{
              method:"POST",
              body:data
          })
          .then(res=>res.json())
          .then(data=>{
              setUrl(data.url)
          })
          .catch(err=>console.log(err))
      }
    return(
        <div>
        <Navbar />
        <div className='container bg-light rounded border mt-2 mb-2'>
            {user.role===1 ? 
                <div>
                    <h1 className='text-center mb-4 mt-4' id='font'><b>Create Product</b></h1>
                    <label id='item' for='title'>Title:</label>
                    <input id='font' className='form-control' name='title' type='text' onChange={(e)=>setTitle(e.target.value)} />
                    <label id='item' for='description'>Description:</label>
                    <textarea id='font' className='form-control' name='description' type='textarea' onChange={(e)=>setDescription(e.target.value)} />
                    <label id='item' for='price'>Price:</label>
                    <input id='font' className='form-control' name='price' type='number' onChange={(e)=>setPrice(e.target.value)} />
                    
                    <label id='item' for='photo'>Photo:</label>
                    <input id='font' className='form-control' name='photo' type='File'
                    onChange={(e)=>setPhoto(e.target.files[0])} />
                    

                    <label id='item' for='stock'>Stock</label>
                    <input  id='font'className='form-control' name='stock' type='number' onChange={(e)=>setStock(e.target.value)} />
                    <button id='item' onClick={()=>Post()} className='btn btn-sm btn-info mt-2 mb-2'>Create Product</button>
                </div>
                :
                <div>
                    <h4 className='text-danger text-center' id='item'>You are not authorized!</h4>
                </div>
            }
            
        </div>
        </div>
    )
}

export default CreateProduct