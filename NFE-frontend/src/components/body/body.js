import React from 'react'
import {Switch, Route} from 'react-router-dom'
import BuyerLogin from './buyer/auth/BuyerLogin'
import BuyerRegister from './buyer/auth/BuyerRegister'
import {useSelector} from 'react-redux'
import NotFound from '../utils/notFound';
import Home from './home/home'

import FarmerRegister from './farmer/auth/FarmerRegister';
import FarmerLogin from './farmer/auth/FamerLogin';
import Profile from '../body/buyer/profile/Profile';
import BuyerHome from "./buyer/feed/BuyerHome";

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />

                <Route path="/buyer/login" component={isLogged ? NotFound : BuyerLogin} exact />
                <Route path="/buyer/register" component={ isLogged ? NotFound : BuyerRegister} exact />
                <Route path="/farmer/login" component={ isLogged ? NotFound : FarmerLogin} exact />
                <Route path="/farmer/register" component={isLogged? NotFound : FarmerRegister} exact/>
                <Route path="/buyer/profile" component={isLogged? Profile : NotFound} exact/>
                <Route path="/buyer/home" component={isLogged? BuyerHome : NotFound} exact/>


            </Switch>
        </section>
    )
}

export default Body