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
import LangHeader from "./LangHeader";


const styling = {
    fontSize:"20px",
    textDecoration:"none"
}

const Languages = () => {
    return (
        <div >
            <Header />
            <LangHeader />
        </div>
    )
}

export default Languages
