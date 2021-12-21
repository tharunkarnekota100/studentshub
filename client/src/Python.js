import React from 'react'
import { Navigate } from 'react-router-dom'
import "./Lang.css"
import Header from './Header'
import LangHeader from './LangHeader'

const Python = () => {
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    return (
        <div>
            <Header />
            <LangHeader />
            <div className='container'>
            <h1>step 1:</h1>
            <h3>Use pycharm Editor</h3>
            <p><b>Note :</b>please avoid using notepad for coding. For coding python, use Pycharm/Vscode for best experience and easy to debug(find error)</p>
            <h1>step 2:</h1>
            <h3>complete Telusko (navin reddy) python video series</h3>
            <a href="https://www.youtube.com/watch?v=QXeEoD0pB3E&list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3" target="_blank" className="btn btn-info">Click here to Watch series of python</a>
            <p><b>Note:</b> watch only first 71 videos of this series</p>
            <h1>step 3:</h1>
            <h3>practise This 50 small logical questions</h3>
            <a href="https://github.com/vjitsuc/python-logical" target="_blank" className="btn btn-info">Click here to get questions & answers of that 50 questions in github</a>
            <p><b>Note:</b> make sure you watch this video.if you dont know how to download the files from github</p>
            <h1>step 4:</h1>
            <h3>practise This 50 small debuging questions</h3>
            <a href="https://github.com/vjitsuc/python-debugging" target="_blank" className="btn btn-info">Click here to get questions & answers of that 50 questions in github</a>
            </div>
            <br /><br /><br />
        </div>
    
    )
}

export default Python
