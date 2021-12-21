import React from 'react'
import { NavLink } from 'react-router-dom'


const Header2 = () => {
    return (
        <nav className="navbar bg-dark justify-content-center" style={{backgroundColor:"grey"}}>

            
            <li className="nav-link ">
                <NavLink to="/Dashboard2" className="nav-link" activeClassName="btn btn-primary" activeStyle={{color:"white"}}>
                    Dashboard
                </NavLink>
            </li>
            <li className="nav-link ">
                <NavLink to="/profile2" className="nav-link" activeClassName="btn btn-primary" activeStyle={{color:"white"}}>
                    Profile
                </NavLink>
            </li>
            <li className="nav-link">
                <NavLink to="/contact2" className="nav-link" activeClassName="btn btn-primary" activeStyle={{color:"white"}}>
                    contact us
                </NavLink>
            </li>
            <li className="nav-link">
                <NavLink to="/login" onClick={()=>localStorage.clear()} className="nav-link" activeClassName="btn btn-primary">
                    Logout
                </NavLink>
            </li>
           

        </nav>
    )
}

export default Header2
