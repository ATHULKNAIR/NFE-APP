import React,{useEffect} from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './app.css';
import { BrowserRouter as Router } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'

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
           const res = await axios.post('http://localhost:5000/buyer/refreshtoken',null)
           dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
        }
        getToken();
      }
   },[auth.isLogged,dispatch])

   useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])

  return (
    <Router>
    <div className="App">

     
     <Header />
     <Body />
      

    </div></Router>
  );
}

export default App;