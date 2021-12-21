import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link,Navigate } from 'react-router-dom';
import Header from './Header';


const Myprofile = () => {
    const [data,setData] = useState (null);
    const [review,setReview] = useState([])
    const [x,setX] = useState("https://github.com/")
    const [y,setY] = useState("https://in.linkedin.com/in/")
    const [t,setT] = useState(0);
    const [c,setC] = useState(0);
    const [d,setD] = useState(0);
    const [e,setE] = useState(0);
    const [n,setN] = useState(0);
    const [s,setS] = useState(0);
    const [newskill,setNewskill] = useState("")
    const [m,setM] = useState(0);

    const [descriptionx,setDescriptionx] = useState("No Description added yet")
    const [xid,setXid] = useState("")
    const [description,setDescription] = useState("")


    const [p,setP] = useState(0);
    const [project,setProject] = useState("")
    const [projectx,setProjectx] = useState("No project added yet")
    const [yid,setYid] = useState("")
    const [newgithub,setNewgithub] = useState("")
    const [newlinkedin,setNewlinkedin] = useState("")
    


    useEffect(()=>{
        axios.get('http://localhost:5000/myprofile',{
                headers : {
                    'x-token' : localStorage.getItem('token')
                }
            }).then(res => setData(res.data))

        axios.get('http://localhost:5000/getdescription',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
            }).then(res =>{ 
                let len = res.data.length
                if(res.data[len-1].description){
                    setDescriptionx(res.data[len-1].description); 
                    setXid(res.data[len-1].profileId) 
                }
                else{
                    setDescriptionx("please add some description about you")

                }
                })


        axios.get('http://localhost:5000/getproject',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
            }).then(res =>{ 
                let len = res.data.length
                if(res.data[len-1].project){
                    setProjectx(res.data[len-1].project); 
                    setYid(res.data[len-1].profileId) 
                }
                
                })




        axios.get('http://localhost:5000/myreview',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(response => setReview(response.data))

    },[])
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

    const deletereviewhandler = id =>{
        axios.delete(`http://localhost:5000/deletereview/${id}`).then(
          arr => alert(arr.data) 
        )
    }

    const deleteHandler = id =>{
        axios.delete(`http://localhost:5000/delete/${id}`).then(
          arr => alert(arr.data)          
        )

        setT(1);

      }

    const CHandler = () =>{
        if(c === 0){
            setC(1)
        }
        if(c === 1){
            setC(0)
        }
    }

    const sHandler = () =>{
        if(s === 0){
            setS(1)
        }
        if(s === 1){
            setS(0)
        }
    }

    const dHandler = () =>{
        if(d === 0){
            setD(1)
        }
        if(d === 1){
            setD(0)
        }
    }

    const eHandler = () =>{
        if(e === 0){
            setE(1)
        }
        if(e === 1){
            setE(0)
        }
    }

    const pHandler = () =>{
        if(p === 0){
            setP(1)
        }
        if(p === 1){
            setP(0)
        }
    }

    const mHandler = () =>{
        if(m === 0){
            setM(1)
        }
        if(m === 1){
            setM(0)
        }
    }

    const nHandler = () =>{
        if(n === 0){
            setN(1)
        }
        if(n === 1){
            setN(0)
        }
    }

    const descriptiondeleteHandler = id =>{
        axios.delete(`http://localhost:5000/deletedescription/${id}`).then(
          arr => alert(arr.data)          
        )
      }

    
    const editsubmithandler = e  =>{
        e.preventDefault();
        console.log("testing1");
        console.log(description);
        axios.post('http://localhost:5000/adddescription',{ description:description },{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
            }).then(
            response => alert(response.data)
        );
        setDescription("")
    }


    const projectsubmithandler = e  =>{
        e.preventDefault();
        console.log("testing3");
        console.log(project);
        axios.post('http://localhost:5000/addproject',{ project:project },{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
            }).then(
            response => alert(response.data)
        );
        setProject("")
    }

    const skillsubmithandler = e  =>{
        e.preventDefault();
        console.log("testing3");
        console.log(newskill);
        console.log(data._id);
        if(newskill){
            console.log("loop")
            axios.put(`http://localhost:5000/updatemyprofile/${data._id}/${newskill}`,).then(
            response => alert(response.data)
        );
        }
        setNewskill("")
        
    }

    const githubhandler = e =>{
        e.preventDefault();
        var newgithub2 = newgithub
        if(newgithub.substr(0,19) === "https://github.com/" || newgithub.substr(0,19) === "https://Github.com/")
        {
            axios.put(`http://localhost:5000/updatemygithub/${data._id}/${newgithub2.substr(19)}`).then(
                res => alert(res.data)
            )
            setNewgithub("")
        }
        else{
            alert('invalid github profile')
        }
    }

    const linkedinhandler = e =>{
        e.preventDefault();
        var newlinkedin2 = newlinkedin
        console.log(newlinkedin.substr(0,28))
        if(newlinkedin.substr(0,28) === "https://www.linkedin.com/in/" )
        {
            if(newlinkedin2[newlinkedin2.length-1] === '/')
            {
                axios.put(`http://localhost:5000/updatemylinkedin/${data._id}/${newlinkedin2.substr(28)}`).then(
                res => alert(res.data)
            )
            }
            else{
                alert("Dont use / at last character")
            }
        }
        else{
            alert('invalid Linkedin profile')
        }
    }
    
    return (
        <div>
            <Header />

            {data &&
            <div className="profile bg-light card " style={{"margin":"10px"}}>
                <center>
                        <img 
                            className="round-img"
                            src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
                            height="250" width="450"
                            alt="user photo"
                        />
                        <div>
                            <h2 style={{"color":"springgreen"}}>{data.fullname}</h2>
                            <h3>{data.collegeId}</h3>
                            <h4>{data.branch}</h4>
                            <p>{data.email}</p>
                            <p><b>Mobile : </b>{data.mobile}</p>
                            {data.github!=="-" ? <div><b>Github : </b><a href={x+data.github} target="_blank">https://github.com/{data.github}</a></div> 
                            : 
                            <div>
                                <button className="btn btn-primary" onClick={()=>mHandler()}>Add Github</button><br /><br />
                                { m === 1 ? 
                                    <div>
                                        <form onSubmit={githubhandler}>
                                            <input type="text" placeholder="Enter your github link" name="newgithub" value={newgithub} onChange={e => setNewgithub(e.target.value) } />&nbsp;&nbsp;
                                            <input type="submit" className="btn btn-success" value="submit" />
                                        </form>
                                    </div>
                                    :
                                    null}
                            </div>}
                            {data.linkedin!=="-" ? <div><b>Linkedin : </b><a href={y+data.linkedin} target="_blank">https://in.linkedin.com/in/{data.linkedin}</a></div> 
                            : 
                            <div>
                                <br />
                                <button className="btn btn-primary" onClick={()=>nHandler()}>Add Linkedin</button><br /><br />
                                { n === 1 ? 
                                    <div>
                                        <form onSubmit={linkedinhandler}>
                                            <input type="text" placeholder="Enter your linkedin link" name="newlinkedin" value={newlinkedin} onChange={e => setNewlinkedin(e.target.value) } />&nbsp;&nbsp;
                                            <input type="submit" className="btn btn-success" value="submit" />
                                        </form>
                                    </div>
                                    :
                                    null}
                            </div>}
                            <p>India</p>
                            <h4><u>Skills</u>:-</h4>
                        </div>

                        <ul>
                            {data.skill.split(",").map(skills => {
                                return <li className="text-primary" style={{ listStyleType: "none", marginLeft: "-30px" }}>{skills}</li>;
                            }
                                )}
                            
                        </ul>



                        <center>
                                    <center>
                                    <div>
                                        <button className="btn btn-success" onClick={()=>  sHandler() }> Edit </button> <br /><br />
                                    </div>
                                    </center>
                                    
                                    { s === 1 ? <div> 
                                            <small>seperate skills with comma(,)</small>
                                            <form onSubmit={skillsubmithandler}>
                                                <input type="text" placeholder="Enter your complete skills" value={newskill} onChange={(e)=> setNewskill(e.target.value)} />&nbsp;
                                                <input type="submit" value="submit" className="btn btn-success" />
                                            </form><br />
                                        </div> 
                                        : null }
                                </center>




                            
                            
                        <div className="card" style={{width:"59%"}}><br />
                            <h1>projects:-</h1>
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

                                <center>
                                    <center>
                                    { projectx === "No project added yet" ? <div><button className="btn btn-success" onClick={()=>  pHandler() }> Add project </button> <br /><br /></div> : <div><button className="btn btn-success" onClick={()=>  pHandler() }> Edit </button> <br /><br /></div> }
                                    </center>
                                    
                                    { p === 1 ? <div> 
                                        <small>seperate projects with comma(,)</small>
                                            <form onSubmit={projectsubmithandler}>
                                                <input type="text" placeholder="Enter about your projects" value={project} onChange={(e)=> setProject(e.target.value)} />&nbsp;
                                                <input type="submit" value="submit" className="btn btn-success" />
                                            </form><br />
                                        </div> 
                                        : null }
                                </center>
                            </center>
                        </div><br />







                        <br /><br />

                        <div className="card" style={{"width":"59%"}}><br />
                            <h2 style={{"color":"palevioletred"}}>Messages From Friends:-</h2><br />

                            {review.length>=1 ?
                                review.map(review =>
                                    <center>
                                        <div className="card " style={{"width":"85%",textAlign:"center",display:'flex',flexDirection:'row',padding:"15px",overflow: 'auto'}}>
                                            <div style={{width:"80%",alignItems:"center"}}>
                                            <h4 >{review.messageSender}</h4>
                                            <p >{review.message}</p>
                                            </div>
                                            <div style={{width:"20%",alignItems:"center",marginTop:'10px'}}>
                                                <button className="btn btn-danger" onClick={()=>deletereviewhandler(review._id)}>Delete</button>
                                            </div>

                                        </div>
                                        <br />
                                    </center>
                                    )
                            :
                                <p>No Message received yet</p>
                            }
                            
                        </div><br />
                </center>
            </div>
            }

            <br />
            <center>
                <button className="btn btn-danger" onClick={()=>  CHandler() }>Delete my Account</button><br /><br />
            </center>

            <center>
                {c === 1 && <div><p><b>Are you sure?</b></p> <button className="btn btn-danger" onClick={()=>  deleteHandler(data._id) }>yes</button> &nbsp;&nbsp; <button className="btn btn-success" onClick={()=> setC(0) }>No</button></div> } <br />
            </center>

            { t===1 && <Navigate to='/login' /> }
        </div>
    )
}

export default Myprofile
