import React from 'react'
import { NavLink } from 'react-router-dom'


const LangHeader = () => {
    return (
        <div>
            <nav className="navbar bg-skyblue justify-content-center" style={{backgroundColor:"grey"}}>

            
            <li className="nav-link ">
                <NavLink to="/python" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Python
                </NavLink>
            </li>
            <li className="nav-link ">
                <NavLink to="/java" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Java
                </NavLink>
            </li>
            <li className="nav-link">
                <NavLink to="/javascript" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Javascript
                </NavLink>
            </li>

            
            </nav>
        </div>
    )
}

export default LangHeader
