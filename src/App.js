import React, { Component } from 'react';
import logo from './Indego_Logo.png';
import './App.css';
import ExploreLink from './components/ExploreLink';
import MapContainer from './components/MapContainer';
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
          <MapContainer />
        </div>
        <footer className="App-footer">
          <p>&copy; Daniel Remel 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
