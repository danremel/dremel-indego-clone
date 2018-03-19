import React, { Component } from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';

// Station status marker icons
import station100 from '../images/marker-100@2x.png';
import station80 from '../images/marker-80@2x.png';
import station60 from '../images/marker-60@2x.png';
import station50 from '../images/marker-50@2x.png';
import station40 from '../images/marker-40@2x.png';
import station20 from '../images/marker-20@2x.png';
import station0 from '../images/marker-0@2x.png';

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
    //         markerIcon = {station0};
    //     } else if(roundedPercent === 50) {
    //         markerIcon = {station50};
    //     } else if(roundedPercent === 100) {
    //         markerIcon = {station100};
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
            icon={station100}
            />
        );

        
        return (
            
            <Map style={{width: '90vw', overflow: 'hidden'}} google={this.props.google} onClick={this.onMapClicked} initialCenter={{lat: 39.9526, lng: -75.1652}}>
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