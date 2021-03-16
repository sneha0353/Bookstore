import React,{useState} from "react"
import logo from "./images/logo.png"
import {useHistory } from "react-router-dom"
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";

const Login = () => {
    const history=useHistory()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit=e=>{
        e.preventDefault()
        fetch('http://localhost:3001/api/login',{
            method:"POST",
            headers:{
            'Content-Type':"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }) 
        .then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
             toast(data.error,{type:"error"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                history.push("/") 
            }
        })
    }
    return(
        <div>
        <h1 id='login' className='text-center mt-4'><img src={logo} alt="k" height='70px' />BookStore</h1>
        <div className='container border mt-4 p-3 bg-light'>
        <h1 id='login'><b>Login</b></h1>
        <ToastContainer/>
            <form type='POST'
            onSubmit={handleSubmit}
            >
                <label for='name' id='item'>Email</label>
                <input 
                type='email' 
                name='email' 
                value={email}
                className='form-control' 
                onChange={(e)=>setEmail(e.target.value)}
                required />
                <label for='password' id='item'>Password</label>
                <input 
                type='password' 
                name='password' 
                className='form-control' 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required />
                <button 
                className='btn btn-sm btn-success mt-3' id='item'>Login</button>
                <h4 id='login' className="mt-4">Don't have an account? <Link to='/signup'>Signup</Link></h4>
            </form>
        </div>
        </div>
    )
}

export default Login

