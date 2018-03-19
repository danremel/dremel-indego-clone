import React, { Component, PropTypes as T } from 'react';
import ReactDOM from 'react-dom';

const evtNames = ['onReady', 'onClick', 'onDragend'];

// Automatically convert strings to camelCase
const camelize = function(str) {
    return str.split(' ').map(function(word){
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
  };

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

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geoLocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                })
            }
        }
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    handleEvent(evtName) {
        let timeout;
        const handlerName = `on${camelize(evtName)}`;

        return (e) => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(() => {
                if (this.props[handlerName]) {
                    this.props[handlerName](this.props, this.map, e);
                }
            }, 0);
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
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })

            this.map = new maps.Map(node, mapConfig);

            evtNames.forEach(e => {
                this.map.addListener(e, this.handleEvent(e));
                Map.propTypes[camelize(e)] = T.func;
            });

            this.map.addListener('onDragend', (evt) => {
                this.props.onMove(this.map);
            });

            maps.event.trigger(this.map, 'onReady');

            let centerChangedTimeout;
            this.map.addListener('onDragend', (evt) => {
                if (centerChangedTimeout) {
                    clearTimeout(centerChangedTimeout);
                    centerChangedTimeout = null;
                }
                centerChangedTimeout = setTimeout(() => {
                    this.props.onMove(this.map);
                }, 0);
            })
        }
    }

    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center);
        }
    }

    renderChildren() {
        const {children} = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        })
    }
    
    render() {
        return (
            <div ref='map' className="mapStyles">
                Loading map...
                {this.renderChildren()}
            </div>
        );
    }
}

Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object,
    onMove: React.PropTypes.func
}
Map.defaultProps = {
    zoom: 13, 
    // Philadelphia
    initialCenter: {
        lat: 39.9526,
        lng: -75.165222
    },
    centerAroundCurrentLocation: false,
    onMove: function() {}
}

export default Map;