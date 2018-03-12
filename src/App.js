import React, { Component } from 'react';
import logo from './Indego_Logo.png';
import './App.css';
import MapFiller from './components/MapFiller';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="Indego-logo" alt="logo" />
        </header>
        <div className="App-body">
          <MapFiller />
        </div>
      </div>
    );
  }
}

export default App;
