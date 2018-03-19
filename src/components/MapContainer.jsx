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

    //     var kioskPercentFull = bikes / (bikes + docks);
    //     var roundedPercent;
    //     if( kioskPercentFull === 0 ) {
    //         roundedPercent = 0
    //     } else if( kioskPercentFull <= .2 ) {
    //         if( bikes > 2 ) {
    //             roundedPercent = 40
    //         } else {
    //             roundedPercent = 20
    //         }
    //     } else if( kioskPercentFull <= .40 ) {
    //         roundedPercent = 40
    //     } else if( kioskPercentFull < .60 ) {
    //         roundedPercent = 50
    //     }  else if( kioskPercentFull < .8 ) {
    //         roundedPercent = 60
    //     } else if( kioskPercentFull < 1 ) {
    //         if( docks > 2 ){
    //             roundedPercent = 60
    //         } else {
    //             roundedPercent = 80
    //         }
    //     } else if( kioskPercentFull === 1 ) {
    //         roundedPercent = 100
    //     }
    //     var {google, maps} = this.props;
    //     var markerIcon = new google.maps.marker.icon;
    //     if(roundedPercent === 0) {
    //         markerIcon = {emptyStation};
    //     } else if(roundedPercent === 50) {
    //         markerIcon = {halfStation};
    //     } else if(roundedPercent === 100) {
    //         markerIcon = {fullStation};
    //     }
    // };
    
    
    render() {
        
        const stationMarkers = indegoJson.features.map((entry) =>
            <Marker
            onClick = {this.onMarkerClick}
            name={entry.properties.name}
            addressStreet={entry.properties.addressStreet}
            position={{lat: entry.properties.latitude, lng: entry.properties.longitude}}
            bikesAvailable={entry.properties.bikesAvailable}
            docksAvailable={entry.properties.docksAvailable}
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
                        <p>{this.state.selectedPlace.addressStreet}</p>
                        <div className="bikes">
                            <h1>{this.state.selectedPlace.bikesAvailable}</h1>
                            <p>Bikes Available</p>
                        </div>
                        <div className="docks">
                            <h1>{this.state.selectedPlace.docksAvailable}</h1>
                            <p>Docks Available</p>
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