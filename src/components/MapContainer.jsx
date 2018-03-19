import React, { Component } from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import fullStation from '../images/marker-100@2x.png';
import halfStation from '../images/marker-50@2x.png';
import emptyStation from '../images/marker-0@2x.png';
// import Map from './Map';
// import Marker from './Marker';

const indegoJson = require('../data/indego.json');
var gApi = "AIzaSyDhlrxKxKfsu5yR0rODClez8EYLYkN45_M"

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    onMarkerClick = function(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            displayingInfoWindow: true
        });
    }

    onMapClicked = function(props) {
        if (this.state.displayingInfoWindow) {
            this.setState({
                displayingInfoWindow: false,
                activeMarker: null
            });
        };
    };

    // determineIcon = function(props) {
    //     const json = indegoJson.features.properties;
    //     const bikes = json.bikesAvailable;
    //     const docks = json.docksAvailable;
    //     quotient = function(bikes, docks){ 
    //         bikes/docks; 
    //     };
    //     if( > .51) {
    //         icon: fullStation
    //     } else if(quotient = .50) {
    //         icon: halfStation
    //     } else if (quotient < .49) {
    //         icon: emptyStation
    //     }
    // }
    
    
    render() {
        
        const stationMarkers = indegoJson.features.map((entry) =>
            <Marker
            onClick = {this.onMarkerClick}
            name={entry.properties.addressStreet}
            position={{lat: entry.properties.latitude, lng: entry.properties.longitude}}
            bikesAvailable={entry.properties.bikesAvailable}
            icon={fullStation}
            />
        );
        return (
            
            <Map google={this.props.google} onClick={this.onMapClicked}>
                    {stationMarkers}
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.displayingInfoWindow}>
                    <div className="info-window">
                    <h2>{this.state.selectedPlace.name}</h2>
                        <div className="bikes-docks">
                            <h3>Bikes Available</h3>
                            <h3>Docks Available</h3>
                        </div>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: gApi
})(MapContainer)