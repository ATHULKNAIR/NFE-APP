import React, {useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import BuyerLogin from './BuyerDetails/components/BuyerLogin';
import BuyerRegister from './BuyerDetails/components/BuyerRegister';
import BuyerProfile from './BuyerDetails/components/BuyerProfile';
import BuyerBoard from './BuyerDetails/components/BuyerBoard';

import FarmerRegister from './FarmerDetails/components/FarmerRegister';
import FarmerLogin from './FarmerDetails/components/FarmerLogin';
import FarmerProfile from './FarmerDetails/components/FarmerProfile';
import FarmerBoard from './FarmerDetails/components/FarmerBoard';

import {FarmLogin} from './FarmerDetails/actions/auth';  

import {Logout} from './BuyerDetails/actions/auth';
import { clearMessage } from "./BuyerDetails/actions/messages";
import { history } from "./helpers/history";


const App=()=> {

   const {user : currentUser} = useSelector(state => state.auth)
   const dispatch = useDispatch()

   useEffect(()=>{
     history.listen((location)=>{
       dispatch(clearMessage());
     });
   },[dispatch])
    
   const LogOut = ()=>{
     dispatch(Logout());
   }
   const FarmerLogOut = () =>{
     dispatch(FarmLogin());
   }

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className='nav-item'>
                <Link to={"/buyer"} className="nav-link"> User </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/buyer/login" className="nav-link" onClick={LogOut}>
                  LogOut
                </a>
              </li>

            </div>
          ):(
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/buyer/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/buyer/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path ="/buyer/login" component={BuyerLogin} />
            <Route exact path ="/buyer/register" component={BuyerRegister} />
            <Route exact path ="/buyer/profile" component={BuyerProfile} />
            <Route exact path ="/buyer/profile" component={BuyerBoard} />
            <Route exact path ="/farmer/login" component={FarmerLogin} />
            <Route exact path ="/farmer/register" component={FarmerRegister} />
            <Route exact path ="/farmer/profile" component={FarmerProfile} />
            <Route exact path ="/farmer/profile" component={FarmerBoard} />

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;