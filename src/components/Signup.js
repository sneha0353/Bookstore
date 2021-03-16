import React,{useState} from "react"
import logo from "./images/logo.png"
import {toast,ToastContainer} from "react-toastify"
import {useHistory,Link} from "react-router-dom"
const Signup = () => {
    const history=useHistory()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/api/signup",
        {
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }
        )
        .then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
              toast(data.error,{type:"error"})
            }
            else{
               history.push("/login")
            }
        })
    }

    return(
        <div>
        <h1 id='login' className='text-center mt-4'><img src={logo} alt="pp"
        height='70px' />BookStore</h1>
        <div className='conatainer border mt-4 ml-5 mr-5 p-3 bg-light'>
        <h1 id='login'><b>Signup</b></h1>
             <ToastContainer/>
            <form type='POST'
            onSubmit={handleSubmit}
            >
                <label for='name' id='item'>Name</label>
                <input type='text'
                 value={name}
                 name='name' 
                 className='form-control' 
                 onChange={(e)=>setName(e.target.value)}
                 required />
                <label for='email' id='item'>Email</label>
                <input 
                type='email' 
                value={email}
                name='email' 
                className='form-control' 
                onChange={(e)=>setEmail(e.target.value)}
                required />
                <label for='password' id='item'>Password</label>
                <input 
                type='password' 
                value={password}
                name='password' 
                className='form-control' 
                onChange={(e)=>setPassword(e.target.value)}
                required />
                <button 
                className='btn btn-sm btn-success mt-3' 
                id='item'
                >Signup</button>
            </form>
            <h4 id='login' className="mt-4">Already have a account? <Link to='/login'>Login</Link></h4>
        </div>
        </div>
    )
}

export default Signup