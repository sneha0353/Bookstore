import React ,{useState}from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
    
    const location = useLocation()
    const [user,setUser] = useState(location.state.myuser)
    const val=JSON.parse(localStorage.getItem("user"))

    console.log(user)

    const Follow=()=>{
        fetch(`http://localhost:3001/api/follow/${user._id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setUser(data.otheruser)
        })
    }

    const unFollow=()=>{
        fetch(`http://localhost:3001/api/unfollow/${user._id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(data=>{
            setUser(data.otheruser)
        })
    }

    return(
        <div>
        <Navbar />
        {user ?
            <div>
            <h1 className='display-4 text-center mt-4 mb-5' id='login'>{user.name}'s Profile</h1>
            <div className='p-2 mt-5' id='login'>
                <div className='row'>
                    <div className='col-3 container'>
                        <img src={user.profilepic} alt="yy" style={{borderRadius:'50%'}} />
                    </div>
                    <div className='col-6 ml-5 mt-5 pt-4'>
                        <div className='row'>
                            <div className='col-4 mr-2'>
                                <h2>Name:</h2>
                                <h2>Email:</h2>
                                <h2>Followers:</h2>
                                <h2>Following:</h2>
                            </div>
                            <div className='col-6 ml-5'>
                                <h2>{user.name}</h2>
                                <h2>{user.email}</h2>
                                <h2>{user.followers.length}</h2>
                                <h2>{user.following.length}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                   {user._id !== val._id 
                    ?
                    <div className='container'>
                    {user.followers.includes(val._id) ? 
                        <button className='btn btn-info mt-5 mr-4' onClick={()=>unFollow()}>Unfollow</button>
                        :
                        <button className='btn btn-info mt-5 mr-4' onClick={()=>Follow()}>Follow</button>
                    }    
               </div>
               :
               <div></div>
                }
                    
            </div>
            </div>
             :
            "loading"
        }
        </div>
    )
//ha dekha jao jao :}oka lolu  utkarsh ek aur ignup kar c1 se aur check kr ya rukk mein karte
}

export default UserProfile