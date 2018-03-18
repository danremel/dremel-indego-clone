import React, { Component } from 'react';
import logo from './Indego_Logo.png';
import './App.css';
import ExploreLink from './components/ExploreLink';
import MapContainer from './components/MapContainer';
import MapTitle from './components/MapTitle';
import Map from './components/Map';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="indego-logo" alt="logo" />
        </header>
        <div className="app-body">
          <MapTitle />
          <ExploreLink />
          <MapContainer />
        </div>
        <footer className="app-footer">
          <p>&copy; Daniel Remel 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
