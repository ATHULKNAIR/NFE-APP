import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './buyer/auth/Login'
import Register from './buyer/auth/Register'
import {useSelector} from 'react-redux'
import NotFound from '../utils/notFound';
import Home from './home/home'
import FarmerRegister from './farmer/auth/FarmerRegister';

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />

                <Route path="/buyer/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/buyer/register" component={ isLogged ? NotFound : Register} exact />
                <Route path="/farmer/register" component={isLogged? NotFound : FarmerRegister} exact/>

            </Switch>
        </section>
    )
}

export default Body