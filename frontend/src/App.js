import React from 'react';
import logo from './assets/logo.svg';
import './App.css';
import Routes from './services/routes';

function App() {


  return (
    <div className="container">
      <img style={{height: '100px', width:'100px'}} src={logo} alt="AirCnC"/>
      <div className="content">
        <Routes />
      </div>
    </div> 
  );
}

export default App;
