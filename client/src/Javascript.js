import React from 'react'
import { Navigate } from 'react-router-dom'
import "./Lang.css"
import Header from './Header'
import LangHeader from './LangHeader'

const Javascript = () => {
    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    return (
        <div>
            <Header />
            <LangHeader />
            <div className="container">
            <h1>step 1:</h1>
            <h3>Use VScode Editor</h3>
            <p><b>Note :</b>please avoid using notepad for coding. For coding javascript, use Vscode for best experience and easy to debug(find error)</p>
            <h1>step 2:</h1>
            <h3>complete Telusko (navin reddy) javascript video series</h3>
            <a href="https://www.youtube.com/watch?v=PlbupGCBV6w&list=PLsyeobzWxl7rrvgG7MLNIMSTzVCDZZcT4" target="_blank" className="btn btn-info">Click here to Watch series of javascript</a>
            <p><b>Note:</b> Make sure you complete all videos in the series</p>
            <h1>step 3:</h1>
            <h3>complete This 50 small logical questions</h3>
            <a href="https://github.com/vjitsuc/javascript-logical" target="_blank" className="btn btn-info">Click here to get questions & answers of that 50 questions in github</a>
            <p><b>Note:</b> make sure you watch this video.if you dont know how to download the files from github</p>
            <h1>step 4:</h1>
            <h3>practise This 50 small debuging questions</h3>
            <a href="https://github.com/vjitsuc/javascript-debugging" target="_blank" className="btn btn-info">Click here to get questions & answers of that 50 questions in github</a>
        </div>
        </div>
    )
}

export default Javascript

