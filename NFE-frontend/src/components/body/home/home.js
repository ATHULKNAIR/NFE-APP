import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="home_page">
            <div className="row">
                    
                    <Link to="/farmer/register">Farmer</Link>
                </div>
                <div className="row">
                   
                    <Link to="/buyer/login">Buyer</Link>
                </div>
        </div>
    )
}

export default Home