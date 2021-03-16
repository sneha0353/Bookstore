import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify"
import logo from "./images/logo.png"

const Navbar = () => {
  const use = JSON.parse(localStorage.getItem('user'))
  const history=useHistory()
  const logout=()=>{
    if(typeof window !="undefined")
    {
        localStorage.clear()
      }
      fetch("http://localhost:3001/api/signout",{
          method:"GET"
      })
      .then(res=>{
        console.log(res)
        toast("signout success",{type:"warning"})
        history.push("/login")
      })
      .catch(err=>console.log(err))
    }  
    return(
      <div>
      <ToastContainer/>
      {localStorage.getItem("jwt") !==null 
      ?
      <nav className="navbar navbar-expand-lg bg-danger navbar-light">
     <a className="navbar-brand" href="/"><img src={logo} height='60px' width='60px' alt="fh" /></a>
     <a className="navbar-brand text-white" href="/">BookStore</a>
     {use.role===1 ? 
      <a className="nav-item text-danger" id='item1' href='/'>Admin</a>
      :
      <div></div>
    }
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active" id="item">
        <Link className="nav-link text-white" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active" id="item">
        <Link className="nav-link text-white" to="/profile">Profile <span className="sr-only">(current)</span></Link>
      </li>
      {use.role===1 ?
        <div>
          <li className="nav-item active" id="item">
            <Link className="nav-link text-white" to="/createproduct">Create Product<span className="sr-only">(current)</span></Link>
          </li> 
        </div>
         : 
        <div></div>
      }
      
      <li className="nav-item active" id="item">
      <Link className="nav-link text-white" to="/">
      <div onClick={logout}>
      Signout 
      </div>
      <span className="sr-only">(current)</span></Link>
    </li>
      </ul>
      <form className="form-inline my-2 my-lg-0" id="change1">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id='item' />
      <button className="btn btn-sm btn-outline-dark my-2 my-sm-0" type="submit" id='item'>Search</button>
    </form>
  </div>
</nav>
      :
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/"><img src={logo} height='60px' alt="rr" width='60px' /></a>
      <a className="navbar-brand" href="/">BookStore</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active" id="item">
          <Link className="nav-link text-white" to="/">Home <span className="sr-only">(current)</span></Link>
        </li>
        <li 
        className="nav-item active" id="item">
          <Link 
          className="nav-link text-white" to="/signup">Signup <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item active" id="item">
          <Link className="nav-link text-white" to="/login">Signin <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item active" id="item">
          <Link className="nav-link text-white" to="/profile">Profile <span className="sr-only">(current)</span></Link>
        </li>
        </ul>
        <form className="form-inline my-2 my-lg-0" id="change1">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id='item' />
        <button className="btn btn-sm btn-outline-dark my-2 my-sm-0" type="submit" id='item'>Search</button>
      </form>
    </div>
  </nav>
    }
    </div>
    )
}

export default Navbar