import React, { useEffect,useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios' 
import Header2 from "./Header2"


const Profile2 = () => {

    
    const [tokenn,setTokenn] = useState(localStorage.getItem('token'))
    
    const [users,setUsers] = useState([])
    const [student,setStudent] = useState([])

    const [z,setZ] = useState(0)
    
    useEffect(()=>{

        axios.get('http://localhost:5000/myprofilebme',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(
            res => setStudent(res.data)
        )

    },[])

    const Handler = () =>{
        axios.get('http://localhost:5000/getuser').then(
            res => setUsers(res.data.filter(item => item.clgId === student.collegeId))
        )
        setZ(1)

    }

    return (
        <div>
            <center>
            <Header2 />
            <br />
            { z===0 ?
            <div>
            <h3 style={{color:"brown"}}>If you not register your seat, then visit Dashboard page to reserve your seat </h3>
            <h4 style={{color:"grey"}}>To know your allocated seat then click on show my details </h4>
            <button onClick={()=>Handler()} className="btn btn-primary"> Show My Details </button>
            </div>
            :
            <div>
            {student.collegeId && <h1 style={{color:"brown"}}>CollegeId : <span style={{color:"grey"}}> {student.collegeId} </span></h1> }
            {student.fullname && <h1 style={{color:"brown"}}>Name : <span style={{color:"grey"}}> {student.fullname} </span></h1> }
            {student.branch && <h1 style={{color:"brown"}}>Branch : <span style={{color:"grey"}}> {student.branch} </span></h1> }
            {student.email && <h1 style={{color:"brown"}}>Email : <span style={{color:"grey"}}> {student.email} </span></h1> }
            
            {users.length>=1 ? <h1 style={{color:"orange"}}>Seat Number : <span style={{color:"violet"}}>{users[0].seatno}</span><span style={{color:"grey"}}> seat is Allocated </span></h1> : <h1 style={{color:"orange"}}> Seat Number - <span style={{color:"red"}}> Not yet reserved </span></h1> }
            {/* <button onClick={()=>console.log(users[0].seatno)}>check</button> */}
            </div>
            }

            </center>

            { tokenn === "undefined" && <Navigate to="/login2" />}
        </div>
    )
}

export default Profile2
