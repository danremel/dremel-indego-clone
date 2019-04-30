import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import axios from 'axios';

// Station status marker icons
import station100 from '../images/marker-100@2x.png';
import station80 from '../images/marker-80@2x.png';
import station60 from '../images/marker-60@2x.png';
import station50 from '../images/marker-50@2x.png';
import station40 from '../images/marker-40@2x.png';
import station20 from '../images/marker-20@2x.png';
import station0 from '../images/marker-0@2x.png';

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
            left: '200px'
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

    determineIcon = function(bikes, docks) {
        var mapSettings = {};

        mapSettings.markers = {
            available: {
                0: station0,
                20: station20,
                40: station40,
                50: station50,
                60: station60,
                80: station80,
                100: station100,
            }
        }

        var kioskPercentFull = bikes / (bikes + docks);

        if (kioskPercentFull === 0) {
            return station0;
        } else if (kioskPercentFull <= 0.2) {
            return station20;
        } else if (kioskPercentFull <= 0.4) {
            return station40;
        } else if (kioskPercentFull <= 0.5) {
            return station50;
        } else if (kioskPercentFull <= 0.6) {
            return station60;
        } else if (kioskPercentFull <= 0.8) {
            return station80;
        } else if (kioskPercentFull <= 1) {
            return station100;
        }
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

    render() {
        const stationMarkers = this.state.locations.map((entry) =>
            <Marker
                onClick={this.onMarkerClick}
                name={entry.properties.name}
                addressStreet={entry.properties.addressStreet}
                position={{ lat: entry.properties.latitude, lng: entry.properties.longitude }}
                bikesAvailable={entry.properties.bikesAvailable}
                docksAvailable={entry.properties.docksAvailable}
                icon={this.determineIcon(entry.properties.bikesAvailable, entry.properties.docksAvailable)}
            />
        );

        return (

            <Map style={{ width: '94vw', overflow: 'hidden' }} google={this.props.google} onClick={this.onMapClicked} initialCenter={{ lat: 39.9526, lng: -75.1652 }}>
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
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)
