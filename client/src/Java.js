import React from 'react'
import { Navigate } from 'react-router-dom'
import Header from './Header'
import LangHeader from './LangHeader'
import "./Lang.css"

const Java = () => {
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    return (
        <div >
            <Header />
            <LangHeader />
            <div className='container'>
            <h1>step 1:</h1>
            <h3>Use Eclipse Editor</h3>
            <p><b>Note :</b>please avoid using notepad for coding. For coding java, use Eclipse for best experience and easy to debug(find error)</p>
            <h1>step 2:</h1>
            <h3>complete Telusko (navin reddy) java 7 hrs video </h3>
            <a href="https://www.youtube.com/watch?v=8cm1x4bC610" target="_blank" className="btn btn-info">Click here to Watch complete video of java</a>
            <p><b>Note:</b> Avoid series of java in telusko channel</p>
            <h1>step 3:</h1>
            <h3>complete This 50 small logical questions</h3>
            <a href="https://github.com/vjitsuc/java-logical" target="_blank" className="btn btn-info">Click here to get questions & answers of that 50 questions in github</a>
            <p><b>Note:</b> make sure you watch this video.if you dont know how to download the files from github</p>
            <h1>step 4:</h1>
            <h3>practise This 50 small debuging questions</h3>
            <a href="https://github.com/vjitsuc/java-debugging" target="_blank" className="btn btn-info">Click here to get questions & answers of that 50 questions in github</a>
            </div>
        </div>
    )
}

export default Java
