import React from "react"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink
} from "react-router-dom";

import Python from "./Python"
import Java from "./Java"
import Javascript from "./Javascript"
import Header from "./Header";

const routes = [
    {
        path: "/python",
        Element: ()=> <Python />
    },
    {
        path: "/java",
        Element: ()=> <Java />
    },
    {
        path: "/javascript",
        Element: ()=> <Javascript />
    },
];

const styling = {
    fontSize:"20px",
    textDecoration:"none"
}

const Languages = () => {
    return (
        <div >
            <Header />
            <Router>
                <div style={{ display : "flex" }}className="container">
                    <div style={{
                        
                        width:"150px",
                        height: "89vh",
                        background: "#f0f0f0",
                        border:"0.1px solid orange",
                        margin:"8px"
                        }}>
                        <ul style={{ listStyleType: "none", padding: "10px" ,textAlign:"center", textDecoration:"none"}}>
                            <li style={{ padding: "10px" ,textAlign:"center" }}>
                                <NavLink to="/python" activeClassName="btn btn-secondary" style={styling}>python</NavLink>
                            </li>
                            <li style={{ padding: "10px" ,textAlign:"center"}}>
                                {/* <NavLink to="/java" activeStyle={{color:"maroon",fontSize:"30px",textDecoration:"none"}}>java</NavLink> */}
                                <NavLink to="/java" activeClassName="btn btn-secondary" style={styling}>java</NavLink>
                            </li>
                            <li style={{ padding: "10px" ,textAlign:"center"}}>
                                <NavLink to="/javascript" activeClassName="btn btn-secondary" style={styling}>javascript</NavLink>
                            </li>
                        </ul>
                    </div>
                    

                    <div style={{flex: 1,padding: "10px"}}>
                        <Routes>
                            {routes.map((route,index )=>(
                                <Route 
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                />
                            ))}
                        </Routes>
                    </div>

                </div>
            </Router>
        </div>
    )
}

export default Languages
