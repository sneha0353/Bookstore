import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {useHistory} from 'react-router-dom'
const val = JSON.parse(localStorage.getItem('user'))

const AllUsers = () => {

    const history = useHistory()

    const [users,setUsers] = useState([])
    
    useEffect(()=>{
        fetch('http://localhost:3001/api/allusers',{
            method:"GET",
            headers:{
                Authorization:"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(user=>{
            setUsers(user)
        })
    },[])

    const EachUser = (user) => {
        if(user._id.toString()===val._id.toString()){
           return history.push('/profile')
        }
        history.push('/bookstoreuser',{myuser:user})
    }

    return(
        <div>
            <Navbar />
            <div className='container'>
                {users ?
                    <div>
                        {users.map(user=>{
                            return(
                            <div className='container border mb-2 mt-4 bg-light rounded' key={user._id}>
                                <button className="btn"
                                onClick={()=>EachUser(user)} style={{textDecoration:'none'}}><h4 className=''>{user.name}</h4></button>
                                <p
                                className="ml-3"
                                >Followers<h4>{user.followers.length}</h4> Following <h4>{user.following.length}</h4></p>
                            </div>
                            )
                        })}
                    </div> 
                     :
                    <div></div>
                }
            </div>
        </div>
    )

}

export default AllUsers