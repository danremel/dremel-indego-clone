import React, { Component } from 'react';
import GoogleApiComponent from 'google-maps-react/dist/GoogleApiComponent.js';
import Map from './Map';

var gApi = "AIzaSyDhlrxKxKfsu5yR0rODClez8EYLYkN45_M"
export class MapContainer extends Component {
    render() {
        return (
            <div className="containerStyles">
                <Map google={this.props.google} />
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: gApi
})(MapContainer)