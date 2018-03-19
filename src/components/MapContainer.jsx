import React, { Component } from 'react';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
// import Map from './Map';
// import Marker from './Marker';

const indegoJson = require('../data/indego.json');
var gApi = "AIzaSyDhlrxKxKfsu5yR0rODClez8EYLYkN45_M"

export class MapContainer extends Component {
    render() {
        const listedInfo = indegoJson.features.map((entry) =>
            <Marker
                name={entry.properties.addressStreet}
                position={{lat: entry.properties.latitude, lng: entry.properties.longitude}}
            />
        )
        return (

                <Map google={this.props.google} zoomControl={true}>
                    {listedInfo}
                </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: gApi
})(MapContainer)