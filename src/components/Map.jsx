import React, { Component } from 'react';

export class Map extends Component {
    constructor(props) {
        super(props);

        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let { initialCenter, zoom } = this.props;
            const { lat, lng } = initialCenter;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);
        }
    }

    render() {
        return (
            <div ref='map'>
                Loading map...
            </div>
        );
    }
}
Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object
}
Map.defaultProps = {
    zoom: 13, 
    // Philadelphia
    initialCenter: {
        lat: 39.963658,
        lng: -75.16618
    }
}

export default Map;