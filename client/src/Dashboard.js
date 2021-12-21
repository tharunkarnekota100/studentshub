import React,{useState,useEffect} from 'react'
import { Link,Navigate } from 'react-router-dom'
import axios from 'axios'
import Header from "./Header"

const Dashboard = () => {
    const [data,setData] = useState ([]);
    const [tokenn,setTokenn] = useState(localStorage.getItem('token'))
    useEffect(()=>{
        axios.get('http://localhost:5000/allprofiles',{
                headers : {
                    'x-token' : localStorage.getItem('token')
                }
            }).then(res => setData(res.data))

        
    },[])
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    console.log(tokenn)

    
    
    return (
        <div>
            <Header />
            
            <section className="container">
                <h1 className="large " style={{"color":"orange","marginTop":"20px"}}>Students Hub</h1>
                <p className="lead">
                    Browse and connect with students
                </p>


                <div className="profiles ">

                    {data.length>1 ? 
                    data.map(profile => 
                        <div className="profile bg-light card " style={{"margin":"10px"}}>
                        <center>
                            <img 
                                className="round-img"
                                src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
                                height="250" width="400"
                                alt="user photo"
                            />
                            <div>
                                <h2 style={{"color":"green"}}>{profile.fullname}</h2>
                                <h3>{profile.collegeId}</h3>
                                <h4>{profile.branch}</h4>
                                <p>{profile.email}</p>
                                {/* <p>{profile.mobile}</p>*/}
                                <Link to={`/indprofile/${profile.fullname}/${profile.email}/${profile.collegeId}/${profile.branch}/${profile.mobile}/${profile.github}/${profile.linkedin}/${profile.skill}/${profile._id}`} className="btn btn-primary">View Profile</Link>
                            </div>

                            <ul>
                                {profile.skill.split(",").map(skill => <li className="text-primary" style={{listStyleType:"none",marginLeft:"-30px"}}>{skill}</li>
                                    )}
                                
                            </ul>
                        </center>
                        </div>
                        )
                    : null}
                    
                </div>


            </section>

            { tokenn === "undefined" && <Navigate to="/login" />}

        </div>
    )
}

export default Dashboard
