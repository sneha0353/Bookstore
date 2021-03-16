import React, { useReducer } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home"
import "./App.css"
import Login from './components/Login';
import Signup from './components/Signup';
import TodoContext from "./context/Context"
import {reducer,initialState} from "./context/reducer"
import Profile from "./components/Profile"
import Product from './components/Product';
import DisplayProd from './components/DisplayProd';
import AdminProduct from './components/AdminProduct';
import CreateProduct from './components/CreateProd';
import UpdateProduct from './components/UpdateProd';
import Order from './components/Order';
import UserProfile from './components/UserProfile';
import AllUsers from "./components/AllUsers"
const App=()=> {

  const [state,dispatch] = useReducer(reducer,initialState)
 
  return (
  
    <TodoContext.Provider value={{state,dispatch}}>
      <Router>
      <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Home} />
       
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/product/user' component={Product} />
        <Route exact path='/productdetail' component={DisplayProd} />
        <Route exact path='/product/admin' component={AdminProduct} />
        <Route exact path='/createproduct' component={CreateProduct} />
        <Route exact path='/updateproduct' component={UpdateProduct} />
        <Route exact path='/allusers' component={AllUsers} />
        <Route exact path='/order' component={Order} />
        <Route exact path='/bookstoreuser' component={UserProfile} />
        </Router>
    </TodoContext.Provider>
  )
 
}
export default App;
