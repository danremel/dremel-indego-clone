import React, { Component, PropTypes } from 'react';

export class Marker extends Component {
    renderMarker() {
        let { map, google, position, mapCenter } = this.props;
        const maps = google.maps;
        
        let pos = position || mapCenter;
        position = new maps.LatLng(pos.lat, pos.lng);
        
        const pref = {
            map: map,
            position: position
        };
        this.marker = new google.maps.Marker(pref);
        this.forceUpdate();
    }

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
        (this.props.position !== prevProps.position)) {
            if (this.marker) {
                this.marker.setMap(null);
            }
            this.renderMarker();
        }
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