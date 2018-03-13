import React, { Component } from 'react';
import logo from './Indego_Logo.png';
import './App.css';
import ExploreLink from './components/ExploreLink';
import MapFiller from './components/MapFiller';
import MapTitle from './components/MapTitle';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="Indego-logo" alt="logo" />
        </header>
        <div className="App-body">
          <MapTitle />
          <ExploreLink />
          <MapFiller />
        </div>
      </div>
    );
  }
}

export default App;
