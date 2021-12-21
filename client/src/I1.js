import React,{useState,useEffect} from 'react'
import { Link,Navigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Indprofile = () => {
    const {fullname,email,collegeId,branch,mobile,github,linkedin,skill,id}=  useParams()
    const [message,setMessage] = useState(null);
    const [messageSender,setMessageSender] = useState(null);
    const [x,gx] = useState("https://github.com/")
    const [y,gy] = useState("https://in.linkedin.com/in/")

    const [descriptionx,setDescriptionx] = useState("No Description added yet")
    const [xid,setXid] = useState("")

    const [projectx,setProjectx] = useState("No Project added yet")
    const [yid,setYid] = useState("")

    useEffect(()=>{
        axios.get(`http://localhost:5000/getdescription2/${match.params.id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
            }).then(
                res =>{ 
                let len = res.data.length
                if(res.data[len-1].description){
                    setDescriptionx(res.data[len-1].description); 
                    setXid(res.data[len-1].profileId) 
                }
                else{
                    setDescriptionx("please add some description about you")
                }
                })


        axios.get(`http://localhost:5000/getproject2/${match.params.id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
            }).then(
                res =>{ 
                let len = res.data.length
                if(res.data[len-1].project){
                    setProjectx(res.data[len-1].project); 
                    setYid(res.data[len-1].profileId) 
                }
                else{
                    setProjectx("please add some projects of you")
                }
                })

    },[])


    const submitHandler = e =>{
        axios.get('http://localhost:5000/myprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setMessageSender(res.data.email))

        let review = {
            messageSender,
            messageReceiver:match.params.id,
            message,
        }
        if(message){
        axios.post('http://localhost:5000/addreview',review,{
                headers : {
                    'x-token' : localStorage.getItem('token')
                }
            }).then(res => alert(res.data))
        }
        else{
            alert("please enter some message")
        }
    }

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    

 
    return (
        <div>
            <Header />

            <div className="profile bg-light card " style={{"margin":"10px"}}>
                <center>
                        <img 
                            className="round-img"
                            src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
                            height="250" width="450"
                            alt="pix"
                        />
                        <div>
                            <h2 style={{"color":"springgreen"}}>{match.params.fullname}</h2>
                            <h3>{match.params.email}</h3>
                            <h4>{match.params.collegeId}</h4>
                            <h5><b>branch : </b>{match.params.branch}</h5>
                            <p><b>Mobile : </b>{match.params.mobile}</p>

                            {match.params.github!=="-" ? <div><b>Github : </b><a href={x+match.params.github} target="_blank">https://github.com/{match.params.github}</a></div> : null}
                            {match.params.linkedin!=="-" ? <div><b>Linkedin : </b><a href={y+match.params.linkedin} target="_blank">https://in.linkedin.com/in/{match.params.linkedin}</a></div> : null}
                            
                            <p>VJIT - Student</p>
                            <h4><u>Skills</u>:-</h4>

                            <ul>
                                {match.params.skill.split(",").map(skills => {
                                    return <li className="text-primary" style={{ listStyleType: "none", marginLeft: "-30px" }}>{skills}</li>;
                                }
                                    )}

                            </ul>

                            <div className="card" style={{"width":"59%"}}><br />
                            <h1>Projects:-</h1>
                                <center>
                                    <div className="card" style={{"width":"85%"}}><br />
                                        {/* <p>{projectx}</p> */}
                                        <ul>
                                            {projectx.split(",").map(skills => {
                                                return <li className="text-primary" style={{ listStyleType: "none", marginLeft: "-30px",color:"black" }}>{skills}</li>;
                                            }
                                                )}
                                        </ul>
                                    </div>
                                    <br />
                                </center>
                            </div>
                            <br />

                            <div className="card" style={{"width":"59%"}}><br />
                            <h1>description:-</h1>
                                <center>
                                    <div className="card" style={{"width":"85%"}}><br />
                                        <p>{descriptionx}</p>
                                        {/* <p>{xid}</p> */}
                                    </div>
                                    <br />
                                </center>
                            </div>

                            <br />

                            <center>
                                        <div className="  card" style={{"width":"30rem",textAlign:"center"}}><br />
                                            <h4>Enter Your Message:</h4>
                                            <form onSubmit={submitHandler}>
                                                <input size="50" type="text" onChange={e => setMessage(e.target.value)} placeholder="Message to this profile holder" /><br /><br />
                                                <input type="submit" className="btn btn-primary" value="send message" /><br /><br />
                                            </form>
                                        </div>
                                        <br />
                            </center>
                        </div>
                </center>
            </div>

           
        </div>
    )
}

export default Indprofile
