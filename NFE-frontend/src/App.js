import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './app.css';
import { BrowserRouter as Router ,Switch, Route } from "react-router-dom";


import Body from './components/body/body';
import FHome from './components/FHome/FHome';
import Bidding from './pages/bidding';
import Contract from './pages/contract';
import Profile from './pages/profile';
import Notification from './pages/notification';





function App() {
  return (
    <Router>
    <div className="App">

     <Body />
         
      

    </div></Router>
  );
}

export default App;