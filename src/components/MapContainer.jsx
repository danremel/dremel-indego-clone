import React, { Component } from 'react';
import GoogleApiComponent from 'google-maps-react/dist/GoogleApiComponent.js';
import Map from './Map';
import Marker from './Marker';

var gApi = "AIzaSyDhlrxKxKfsu5yR0rODClez8EYLYkN45_M"
export class MapContainer extends Component {
    render() {
        const pos = {lat: 39.9525839, lng: -75.16522150000003};
        return (
            <div className="containerStyles">
                <Map google={this.props.google}>
                    {/* <Marker />
                    <Marker position={pos} /> */}
                </Map>
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: gApi
})(MapContainer)