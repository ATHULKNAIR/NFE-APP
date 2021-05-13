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
            await axios.get('/buyer/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/buyer/login";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="photo">
            <img src={user.photo} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/buyer/profile">Profile</Link></li>
                <li><Link to="/buyer/login" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <header>
            <h2>National Farmers' Exchange</h2>
            <ul style={transForm}>
                
               
                {
                    isLogged
                    ? userLink()
                    :null
                }
                
            </ul>
        </header>
    )
}

export default Header