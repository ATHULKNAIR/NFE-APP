import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './app.css';
import { BrowserRouter as Router } from "react-router-dom";


import Body from './components/body/body';






function App() {
  return (
    <Router>
    <div className="App">

     <Body />
         
      

    </div></Router>
  );
}

export default App;