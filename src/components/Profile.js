import React ,{useState,useEffect}from "react"
import Navbar from "./Navbar"

const Profile=()=>{
    
    const cal=JSON.parse(localStorage.getItem("user"))

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [followers,setFollowers] = useState([])
    const [following,setFollowing] = useState([])
    const [photo,setPhoto] =useState("")

    const [order,setOrder] = useState('')
    console.log(order)
    useEffect(() => {
        fetch('http://localhost:3001/api/orders',{
            method:'GET',
            headers:{
                Authorization:'Bearer '+localStorage.getItem('jwt')
            },
        }).then(res => res.json())
        .then(result => {
            setOrder(result)
        })
    },[])
    
     useEffect(()=>{
         fetch(`http://localhost:3001/api/user/${cal._id}`,{
             headers:{
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             }
         })
         .then(res=>res.json())
         .then(result=>{
            setName(result.name)
            setEmail(result.email)
            setFollowers(result.followers)
            setFollowing(result.following)
            setPhoto(result.profilepic)
         })
     },[cal._id])
    return (
        <div>
            <Navbar />
            <h1 className='display-4 text-center mt-4 mb-5' id='login'>{name}'s Profile</h1>
            <div className='p-2 mt-5' id='login'>
                <div className='row'>
                    <div className='col-3 container'>
                        <img src={photo} alt="xd" style={{borderRadius:'50%'}} />
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
                                <h2>{name}</h2>
                                <h2>{email}</h2>
                                <h2>{followers.length}</h2>
                                <h2>{following.length}</h2>
                            </div>
                        </div>
                    </div>
                </div>
          
                    <div className=' container mt-5 bg-light p-2 rounded col-4 text-center'>
                        <h2>Orders</h2>
                        <table>
                            <tr>
                                {order._id}
                            </tr>
                        </table>
                    </div>
              
               
            </div>
        </div>
    )
}
export default Profile