import React,{useEffect, useState} from 'react'
import {Link,Navigate} from "react-router-dom"
import axios from 'axios'

const Admin2 = () => {
    const [auth,setAuth] = useState(0)
    const [nexteventinfo,setNextevent] = useState("")
    const [x,setX] = useState(0)
    const [y,setY] = useState(0)
    const [k,setK] = useState(0)
    const [batchs,setBatchs] = useState([])
    const [nexteventid,setNexteventid] = useState("")
    const [updatenextevent,setUpdatenextevent] = useState("");
    const [dummyid,setDummyid] = useState(null)
    const [problems,setProblems] = useState([])
    const [selectedFiles,setSelectedfiles] = useState(null);
    const [data,setData] = useState({
        email : '',
        password : '',
    })
    const {email,password} = data
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const [years,setYears] = useState({
        year1:"",
        year2:"",
        year3:"",
        year4:"",
    })

    const {year1,year2,year3,year4} = years

    const yearschangeHandler = e =>{
        setYears({...years,[e.target.name]:e.target.value})
    }

    const submitHandler = e =>{
        e.preventDefault();
        if(email === "suc@gmail.com" && password === "tharun"){
            setAuth(1);
            setData({email:"",password:""})

        }
        else{
            alert("Invalid details")
        }
    }

    useEffect(()=>{
        
        axios.get("http://localhost:5000/getquerybme").then(
            res => setProblems(res.data)
        )

        axios.get("http://localhost:5000/getopenregister").then(
            res => {
                if(res.data.length>=1){
                    setDummyid(res.data[0]._id);
                    setX(1);
                }
            })

        axios.get("http://localhost:5000/getnextevent").then(
            res => {
                if(res.data.length>=1){
                    setNexteventid(res.data[0]._id); 
                    setY(1);
                }
            })

        axios.get("http://localhost:5000/getyears").then(
            res => {
                if(res.data.length>=1){
                    setBatchs(res.data) 
                    setK(1);
                }
            })
        
        
    },[])

    const logoutHandler = () =>{
        setAuth(0)
    }

    const fileHandler = (e) =>{
        // console.log(e);
        console.log(e.target.files);
        // this.setState({selectedFiles:e.target.files})
        setSelectedfiles(e.target.files)
       }

    const fileUpload = () =>{
        for(let i=0;i<selectedFiles.length;i++){
          let formData = new FormData()
          formData.append('file',selectedFiles[i]);
          formData.append('upload_preset','bvfppdbk');
          axios.post('https://api.cloudinary.com/v1_1/drnndbow7/image/upload',formData).then(res =>{
            
            axios.post('http://localhost:5000/addposter',{pic:res.data.url}).then(res =>{ console.log(res.data)  });
            alert("Successfully Uploaded");
            setAuth(0);
          })
        }
      }

    const deleteproblem = index =>{
        console.log(index);
        axios.delete(`http://localhost:5000/deleteproblembme/${index}`).then(
            res =>{ alert(res.data) }
        )
    }

    const openregistration = () =>{
        axios.post('http://localhost:5000/addopenregister',{dummy:2}).then(
            res => alert(res.data)
        )
    }

    const closeregistration = () =>{
        axios.delete(`http://localhost:5000/deletecloseregister/${dummyid}`).then(
            res => alert(res.data)
        )
    }

    const nexteventHandler = e =>{
        e.preventDefault();
        console.log(nexteventinfo);
        if(nexteventinfo){
            axios.post('http://localhost:5000/addnextevent',{nextevent : nexteventinfo}).then(

                res => alert(res.data)
            )
        }
        else{
            alert("Give some info about next event")
        }
        setNextevent("")
    }

    const updatenexteventHandler = e =>{
        e.preventDefault();
        console.log(updatenextevent);
        console.log(nexteventid);
        if(updatenextevent){
            axios.put(`http://localhost:5000/updatenextevent/${nexteventid}/${updatenextevent}`).then(
                res => alert(res.data)
            )
        }
        else{
            alert('give some info about next event')
        }
        setUpdatenextevent("")
    }

    // var v=0
    // const verifyyears = () =>{
        
    //     if(year1){
    //         if(year1.length === 2)
    //         {
    //             v=1
    //         }
    //     }

    //     if(year2)
    // }

    const yearssubmitHandler = e =>{
        e.preventDefault();
        console.log(years);
        if( (year1==="" || year1.length === 2) && (year2==="" || year2.length === 2 )&& (year3==="" || year3.length === 2) && (year4==="" || year4.length === 2) )
        {
            if(year1 === ""){
                years.year1 = "-"
            }
            if(year2 === ""){
                years.year2 = "-"
            }
            if(year3 === ""){
                years.year3 = "-"
            }
            if(year4 === ""){
                years.year4 = "-"
            }
            axios.post('http://localhost:5000/addyears',years).then(
                res => alert(res.data)
            )
            console.log(years)
        }
        else{
            alert("Invalid Batch series")
        }
    }

    const deleteBatchsHandler = id =>{
        axios.delete(`http://localhost:5000/deleteyears/${id}`).then(
            res => alert(res.data)
        )
    }

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    
    return (
        <div>
            <div>
            
            <nav className="navbar bg-dark justify-content-left">
                <h1 style={{"marginLeft":"5px"}}>
                    <Link to='/bme'>VJIT Book My Event</Link>
                </h1>
                <div className="justify-content-left" >
                    <h5 >
                        <Link to="/register2" className="btn btn-secondary" style={{margin:"12px"}}>Register</Link>
                        <Link to="/login2" className="btn btn-secondary" >Login</Link>&nbsp;&nbsp;
                        <Link to="/admin2" className="btn btn-secondary" >Admin</Link>&nbsp;&nbsp;
                    </h5>
                </div>
                
            </nav>

            {auth === 0 ?
                
                <section className="container">
                    <h1 className="large " style={{"color":"orange","marginTop":"100px"}} >Sign In to Admin page</h1>
                    <p className="lead"><b>only admins are allowed</b></p>
                    <form onSubmit={submitHandler} autoComplete="off">
                        <input className="form-control-lg m-1 border" style={{width:"40%"}} type="email"    placeholder="Enter email"    name="email" value={email}   onChange={changeHandler} /><br /><br />
                        <input className="form-control-lg m-1 border" style={{width:"40%"}} type="password" placeholder="Enter password" name="password" value={password} onChange={changeHandler} /><br /><br />
                        <input type="submit" className="btn btn-primary" value="login" />
                    </form>
                    
                </section>

                :

                <div>

                    <center>
                    <br /><br /><br />
                    <h2 style={{color:"#1C5D99"}}><b>Poster:- </b></h2>
                    <div className="card bg-light" style={{width:"40rem",padding:"40px"}}>
                    <form className="fileupload">
                        <input type="file"  className="inputfile" onChange={fileHandler}/>
                        <input type="button" className="btn btn-primary" onClick={fileUpload} value='upload' className="submit" />
                    </form>
                    </div>

                    <br /><br />
                    <h2 style={{color:"orange"}}><b>Registration Status:-</b></h2>
                    <div className="profile bg-light card" style={{width:"200px"}}>

                        
                       {x === 0 ? <button className="btn btn-primary" onClick={openregistration}>Open Registration</button> : null }
                       {x === 1 ? <button className="btn btn-danger" onClick={closeregistration}>close Registration</button> : null }

                    </div>
                    <br /><br />

                    <h2 style={{color:"#96E072"}}><b>Next Event Status:-</b></h2>
                    {y === 0 ? 
                    <div className="card bg-light" style={{width:"60%"}}>
                        <br />
                        <form onSubmit={nexteventHandler}>
                            <input type="text" className="form-control-lg m-1 border" placeholder="Update about next event" onChange={e => setNextevent(e.target.value)} name="nexteventinfo" value={nexteventinfo} /><br />
                            <input type="submit" className="btn btn-info" value="Add Next Event" /><br /><br />
                        </form>
                        <br />
                    </div>
                    :
                    <div className="card bg-light" style={{width:"60%"}}>
                        <br />
                        <form onSubmit={updatenexteventHandler}>
                            <input type="text" className="form-control-lg m-1 border" style={{width:"70%"}} placeholder="Update about next event" onChange={e => setUpdatenextevent(e.target.value)} name="updatenextevent" value={updatenextevent} /><br /><br />
                            <input type="submit" className="btn btn-primary" style={{border:"1px solid blue"}} value="Update" /><br /><br />
                        </form>
                        <br />
                    </div>
                }

                { k === 0 ? 
                <div>
                <br /><br />
                <h2 style={{color:"#96E072"}}><b>Batch Acceptation:-</b></h2>
                <div className="card bg-light" style={{width:"60%"}}>
                    <form onSubmit={yearssubmitHandler}>
                        <br />
                        <input className="form-control-lg m-1 border" type="text" placeholder="Batch 1" name="year1" value={year1} onChange={e => yearschangeHandler(e)} /><br />
                        <input className="form-control-lg m-1 border" type="text" placeholder="Batch 2" name="year2" value={year2} onChange={e => yearschangeHandler(e)} /><br />
                        <input className="form-control-lg m-1 border" type="text" placeholder="Batch 3" name="year3" value={year3} onChange={e => yearschangeHandler(e)} /><br />
                        <input className="form-control-lg m-1 border" type="text" placeholder="Batch 4" name="year4" value={year4} onChange={e => yearschangeHandler(e)} /><br />
                        <input type="submit" className="btn btn-primary" value="submit" /><br /><br />
                    </form>
                </div>
                </div>
                :
                <div>
                
                <br /><br />
                <h2 style={{color:"#96E072"}}><b>Present Batches for Accepting:-</b></h2>
                <div className="card bg-light" style={{width:"60%"}}>
                    <br />
                    {batchs[0].year1 !== "-" ? <div><h3><b>Batch : </b>{batchs[0].year1}</h3></div> : null }
                    {batchs[0].year2 !== "-" ? <div><h3><b>Batch : </b>{batchs[0].year2}</h3></div> : null }
                    {batchs[0].year3 !== "-" ? <div><h3><b>Batch : </b>{batchs[0].year3}</h3></div> : null }
                    {batchs[0].year4 !== "-" ? <div><h3><b>Batch : </b>{batchs[0].year4}</h3></div> : null }
                    <br />
                    <center><button onClick={id => deleteBatchsHandler(batchs[0]._id)} style={{width:"25%"}} className="btn btn-danger" >Delete</button></center>
                    <br />
                </div>
                
                </div>}


                    <br /><br />
                    <button className="btn btn-secondary" onClick={logoutHandler}>Log out</button>
                    </center> 

                    <br /><br />
                    <center>
                    <h2 style={{color:"#1C5D99"}}><b>-: Student Problems :-</b></h2>
                    

                    {  problems.length >= 1 ? 
                        <div>
                            { problems.map(item => 
                                <div className="profile bg-light card " style={{"margin":"10px",width:"60%"}}>
                                    <p><b>collegeID : </b>{item.clgid}</p>
                                    <p><b>Problem : </b>{item.problem}</p>
                                    
                                    <center><button className="btn btn-danger" style={{width:"100px",borderRadius:"100px"}} onClick={() => deleteproblem(item._id)}>Delete</button></center><br />
                                </div>)}
                        </div>
                        :
                        null
                    }

                    </center>
                </div>

            }
            </div>
        )
        </div>
    )
}

export default Admin2
