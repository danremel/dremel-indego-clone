import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import axios from 'axios';

// Station status marker icons
import station100 from '../images/marker-100@2x.png';
// import station80 from '../images/marker-80@2x.png';
// import station60 from '../images/marker-60@2x.png';
// import station50 from '../images/marker-50@2x.png';
// import station40 from '../images/marker-40@2x.png';
// import station20 from '../images/marker-20@2x.png';
// import station0 from '../images/marker-0@2x.png';

var gApi = "AIzaSyDhlrxKxKfsu5yR0rODClez8EYLYkN45_M"

// #TODO: Conditionally render different icons for map markers
//      dependent on percentage of available bikes
// var mapSettings = {};
// mapSettings['imagePath'] = '../images/';

// mapSettings.markers = {
// 	available: {
// 		0: mapSettings.imagePath + 'marker-0@2x.png',
// 		20: mapSettings.imagePath + 'marker-20@2x.png',
// 		40: mapSettings.imagePath + 'marker-40@2x.png',
// 		50: mapSettings.imagePath + 'marker-50@2x.png',
// 		60: mapSettings.imagePath + 'marker-60@2x.png',
// 		80: mapSettings.imagePath + 'marker-80@2x.png',
// 		100: mapSettings.imagePath + 'marker-100@2x.png',
//     }
// }
// console.log(mapSettings.markers.available[0])

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: null,
            position: null
        }
    }

    onSubmit = function (e) {
        e.preventDefault();
    }

    componentDidMount() {
        this.renderAutoComplete();
    }

    componentDidUpdate(prevProps) {
        const { map } = this.props;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    }

    renderAutoComplete = function () {
        const { google, map } = this.props;

        if (!google || !map) return;

        const aref = this.refs.autocomplete;
        const node = ReactDOM.findDOMNode(aref);
        var autocomplete = new google.maps.places.Autocomplete(node);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            this.setState({
                place: place,
                position: place.geometry.location
            })
        })
    }

    render() {
        const formContainer = {
            position: 'absolute',
            top: '10px',
            left: '127px'
        }
        const inputStyles = {
            height: '30px',
            fontSize: '.85em'
        }
        return (
            <div style={formContainer}>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input
                            style={inputStyles}
                            ref='autocomplete'
                            type="text"
                            placeholder="Enter a location" />
                        <input
                            style={inputStyles}
                            type='submit'
                            value='Go' >
                        </input>
                    </form>
                </div>
                <Marker position={this.state.position} />
            </div>
        )
    }
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            locations: []
        }
        
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }
    
    componentDidMount() {
    var _this = this;
    axios.get("https://www.rideindego.com/stations/json/")
        .then(function(response) {
            const locations = response.data.features;
            _this.setState({ locations })
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    onMarkerClick = function (props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            displayingInfoWindow: true
        });
    }

    onMapClicked = function (props) {
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
    //         roundedPercent = 0;
    //     } else if( kioskPercentFull <= .2 ) {
    //         if( bikes > 2 ) {
    //             roundedPercent = 40;
    //         } else {
    //             roundedPercent = 20;
    //         }
    //     } else if( kioskPercentFull <= .40 ) {
    //         roundedPercent = 40;
    //     } else if( kioskPercentFull < .60 ) {
    //         roundedPercent = 50;
    //     }  else if( kioskPercentFull < .8 ) {
    //         roundedPercent = 60;
    //     } else if( kioskPercentFull < 1 ) {
    //         if( docks > 2 ){
    //             roundedPercent = 60;
    //         } else {
    //             roundedPercent = 80;
    //         }
    //     } else if( kioskPercentFull === 1 ) {
    //         roundedPercent = 100;
    //     }

    //     var icon;

    //     var markers = mapSettings.markers;
    //     var currentIcon = this.marker.getIcon();

    //     icon = markers.available[roundedPercent];
    //     console.log(icon);


    // if( icon !== currentIcon ) {
    //     this.marker.setIcon({
    //         url: icon,
    //     });
    // };
    // };

    

    render() {

        const stationMarkers = this.state.locations.map((entry) =>
            <Marker
                onClick={this.onMarkerClick}
                name={entry.properties.name}
                addressStreet={entry.properties.addressStreet}
                position={{ lat: entry.properties.latitude, lng: entry.properties.longitude }}
                bikesAvailable={entry.properties.bikesAvailable}
                docksAvailable={entry.properties.docksAvailable}
                icon={station100}
            />
        );


        return (

            <Map style={{ width: '90vw', overflow: 'hidden' }} google={this.props.google} onClick={this.onMapClicked} initialCenter={{ lat: 39.9526, lng: -75.1652 }}>
                <SearchBar />
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