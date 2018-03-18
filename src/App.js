import React, { Component } from 'react';
import logo from './images/Indego_Logo.png';
import fullStationImg from './images/marker-100@2x.png';
import healthyStationImg from './images/marker-50@2x.png';
import emptryStationImg from './images/marker-0@2x.png';
import './App.css';
import ExploreLink from './components/ExploreLink';
import MapContainer from './components/MapContainer';
import MapTitle from './components/MapTitle';


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
          <div className="map-legend">
            <img src={fullStationImg} alt="Station Full"/><span>Station Full</span>
            <img src={healthyStationImg} alt="Station Healthy"/><span>Station Healthy</span>
            <img src={emptryStationImg} alt="Station Empty"/><span>Station Empty</span>
          </div>
        </div>
        <footer className="app-footer">
          <p>&copy; Daniel Remel 2018</p>
        </footer>
      </div>
    );
  }
}

export default App;
