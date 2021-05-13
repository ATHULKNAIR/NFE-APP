import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './buyer/auth/Login'
import Register from './buyer/auth/Register'
import {useSelector} from 'react-redux'
import NotFound from '../utils/notFound';
import Home from './home/home'
import FLogin from './farmer/auth/FLogin';
import FRegister from './farmer/auth/FRegister'
import FHome from '../FHome/FHome';
// import Bidding from './pages/bidding';
// import Contract from './pages/contract';
import Profile from '../body/farmer/profile/profile';
// import Notification from './pages/notification';



function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />

                <Route path="/buyer/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/buyer/register" component={ isLogged ? NotFound : Register} exact />
                <Route path="/farmer/login" component={isLogged ? NotFound : FLogin} exact />
                <Route path="/farmer/register" component={ isLogged ? NotFound : FRegister} exact />
                <Route path="/farmer/home" component={FHome} exact />
                <Route path="/farmer/profile" component={Profile} exact />


            </Switch>
        </section>
    )
}

export default Body