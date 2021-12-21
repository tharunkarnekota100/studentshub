import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div>
            <center>

                
                <section  style={{"marginTop":"170px"}}>
                    
                        <h1 >VJIT Students Hub</h1>
                        <p >
                            create a student profile and find your project patners
                        </p>
                        <Link to='/register' className="btn btn-primary">Signup</Link>&nbsp;&nbsp;&nbsp;
                        <Link to='/login' className="btn btn-success">SignIn</Link>
                    
                </section>
            </center>
        </div>
        
    )
}

export default Home
