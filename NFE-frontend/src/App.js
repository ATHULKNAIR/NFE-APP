import React,{useEffect} from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './app.css';
import { BrowserRouter as Router } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'

import Body from './components/body/body';
import Header from './components/header/Header';
import axios from 'axios';






function App() {

  const dispatch = useDispatch()
   const token = useSelector(state => state.token)
   const auth = useSelector(state => state.auth)

   useEffect(()=>{
      const firstLogin = localStorage.getItem('firstLogin')
      if(firstLogin){
        const getToken = async ()=>{
           const res = await axios.post('/buyer/login',null)
           console.log(res)
        }
        getToken();
      }
   },[auth.isLogged])

  return (
    <Router>
    <div className="App">

     
     <Header />
     <Body />
      

    </div></Router>
  );
}

export default App;