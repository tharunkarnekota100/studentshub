import React, { useEffect,useState } from 'react'
import Header from './Header'
import axios from "axios"


const Contact = () => {
    const [data,setData] = useState([])
    const [info,setInfo] = useState({
        skillsreq : '',
        theme : ''
    })

    const {skillsreq,theme} = info

    const changeHandler = e =>{
        setInfo({...info,[e.target.name]:e.target.value})
    }

    const reqHandler = e =>{
        e.preventDefault();
        if( skillsreq && theme.length>9){
            axios.post('http://localhost:5000/addrequirements',info,{
                    headers : {
                        'x-token' : localStorage.getItem('token')
                    }
                }).then(res => alert(res.data))

            setInfo({['skillsreq']:[''],['theme']:['']});
        }
        else{
            alert("give two valid inputs and make sure, Theme should be more than 10 characters")
        }
        
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/getrequirements',{
                headers : {
                    'x-token' : localStorage.getItem('token')
                }
            }).then(res => setData(res.data))

    },[])

    return (
        <div>
            <Header />
            <section className="container">
                <h1 className="large " style={{"color":"orange","marginTop":"20px"}}>Searching for Team?</h1>
                <p className="lead">
                    Give your requirements and theme of your project
                </p>


                <div className="profiles ">

                    { data.length>1 ? 
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
                                <h2 style={{"color":"green"}}>{profile.name}</h2>
                                <h3>{profile.clgid}</h3>
                                {/* <h4>{profile.requirements}</h4> */}
                                <p><b>Requirements : </b>{profile.skillsreq}</p>
                                <p><b>Theme : </b>{profile.theme}</p>
                                
                            </div>
                            
                        </center>
                        </div>
                        )
                    : null}
                    
                </div><br /><br />
                
                <center>
                <div>
                    <h2 style={{color:"purple"}}>Add your Requirements and Theme :</h2>
                    <form onSubmit={reqHandler}>

                        <input type="text" className="form-control-lg m-1 border" placeholder="Requirements" name="skillsreq" onChange={changeHandler} value={skillsreq} /><br />
                        <input type="text" className="form-control-lg m-1 border" placeholder="Theme" name="theme" onChange={changeHandler} value={theme} /> <br /><br />
                        <input type="submit" className="byn btn-success" placeholder="submit" />

                    </form>
                    <br /><br />

                </div>
                </center>

            </section>
        </div>
    )
}

export default Contact
