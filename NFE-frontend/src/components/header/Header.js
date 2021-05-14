import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import './header.css'


function Header() {
    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth


    const handleLogout = async () => {
        try {
            await axios.get('http://localhost/farmer/logout')
           
                localStorage.removeItem('farmerLogin')
                window.location.href = "/farmer/login";
          
            
        } catch (err) {
            window.location.href = "/farmer/login";
        }
    }

    const userLink = () => {
        return <div className="drop-nav"> 
                <Link to="/farmer/login" onClick={handleLogout}>Log out</Link>
        </div>
    }

    

    return (
        <header>
            <h2>National Farmers' Exchange</h2>
            <ul >{ isLogged ? userLink():null }</ul>
        </header>
    )
}

export default Header