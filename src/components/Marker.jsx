import React, { Component, PropTypes } from 'react';
import GoogleApiComponent from 'google-maps-react/dist/GoogleApiComponent.js';

export class Marker extends Component {
    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
        (this.props.position !== prevProps.position)) {
            if (this.marker) {
                this.marker.setMap(null);
            }
            this.renderMarker();
        }
    }
    renderMarker() {
        const maps = google.maps;
        let marker = new maps.Marker({
            position: {lat: 39.9525839, lng: -75.16522150000003},
            map: map
        });

        let { map, google, position, mapCenter } = this.props;
        let pos = position || mapCenter;
        position = new maps.LatLng(pos.lat, pos.lng);
        

        const pref = {
            map: map,
            position: position
        };
        this.marker = new google.maps.Marker(pref);
    }

    render() {
        return null;
    }
}

Marker.propTypes = {
    position: React.PropTypes.object,
    map: React.PropTypes.object
}

export default Marker;