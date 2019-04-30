import React, { Component } from 'react';
import logo from './images/Indego_Logo.png';
import fullStationImg from './images/marker-100@2x.png';
import healthyStationImg from './images/marker-50@2x.png';
import emptryStationImg from './images/marker-0@2x.png';
import './App.css';
import SubHeader from './components/SubHeader';
import MapContainer from './components/MapContainer';
import Weather from './components/Weather';
require('dotenv').config();

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="indego-logo" alt="logo" />
        </header>
        <div className="app-body">
          <SubHeader />
          <Weather />
          <div className="map-container">
            <MapContainer containerStyles={{ width: '50%' }} />
          </div>
          <div className="map-legend">
            <img src={fullStationImg} alt="Station Full" /><span>Station Full</span>
            <img src={healthyStationImg} alt="Station Healthy" /><span>Station Healthy</span>
            <img src={emptryStationImg} alt="Station Empty" /><span>Station Empty</span>
          </div>
        </div>
        <footer className="app-footer">
          <p>&copy; Daniel Remel 2018 | | <a href="https://github.com/danremel">View GitHub</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
