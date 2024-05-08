import React from 'react';

import Header from './Components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HeaderBar from './Components/Header/HeaderBar';
import AppRoutes from './routes/Approutes';
// import AppRoutes from './routes/AppRoutes';
// import { Router, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header/>
      
      <Router>
      {/* <Routes> */}
            <AppRoutes/>
      {/* </Routes> */}
       </Router>
     
    </div>
  );
}

export default App;
