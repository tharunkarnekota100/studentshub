import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './Dashboard'
import Myprofile from './Myprofile'
import Indprofile from './Indprofile'
import Languages from './Languages'
import Java from "./Java"
import Python from './Python'
import Javascript from './Javascript'
import Contact from "./Contact"
import Project from "./Project"
import Requirements from "./Requirements"
import Resources from './Resources'

//

import Login2 from './Login2'
import Register2 from './Register2'
import Home2 from './Home2'
import Dashboard2 from './Dashboard2'
import Profile2 from './Profile2'
import Contact2 from './Contact2'
import Admin2 from './Admin2'



const App = () => {
  return (
    <div>
      <BrowserRouter>
      
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/languages' exact element={<Languages />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/project' exact element={<Project />} />
        
        <Route path='/requirements' exact element={<Requirements />} />
        <Route path='/python' exact element={<Python />} />
        <Route path='/java' exact element={<Java />} />
        <Route path='/javascript' exact element={<Javascript />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/myprofile' exact element={<Myprofile />} />
        <Route path='/resources' exact element={<Resources />} />
        <Route path='/contact' exact element={<Contact />} />
        <Route path='/indprofile/:fullname/:email/:collegeId/:branch/:mobile/:github/:linkedin/:skill/:id' exact element={<Indprofile />} />


        <Route path='/bme' exact element={<Home2 />} />
        <Route path='/admin2' exact element={<Admin2 />} />
        <Route path='/login2' exact element={<Login2 />} />
        <Route path='/register2' exact element={<Register2 />} />
        <Route path='/dashboard2' exact element={<Dashboard2 />} />
        <Route path='/profile2' exact element={<Profile2 />} />
        <Route path='/contact2' exact element={<Contact2 />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
