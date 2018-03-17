import React, { Component } from 'react';
import axios from 'axios';

/* Local JSON file */
// const json = require('../data/indego.json');

class MapFiller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geometry: {
                coordinates: [
                    "",
                    ""
                ],
                type: ""
                },
                properties: {
                    addressStreet: "",
                    addressCity: "",
                    addressState: "",
                    addressZipCode: "",
                    bikesAvailable: "",
                    closeTime: "",
                    docksAvailable: "",
                    eventEnd: null,
                    eventStart: null,
                    isEventBased: false,
                    isVirtual: false,
                    isVisible: false,
                    kioskId: "",
                    kioskPublicStatus: "",
                    kioskStatus: "",
                    name: "",
                    notes: null,
                    openTime: "",
                    publicText: "",
                    timeZone: "",
                    totalDocks: "",
                    trikesAvailable: "",
                    kioskConnectionStatus: "",
                    kioskType: "",
                    latitude: "",
                    longitude: "",
                    hasGeofence: false,
                },
                type: ""
        }
    }

    render() {
        axios.get('https://www.rideindego.com/stations/json/')
        .then(function (response) {
            response.data.features.forEach(function (entry) {
                var info = entry.properties;
                // console.log(info);
            });
            console.log(response.data.features);
        })
        .catch(function (error) {
        console.log(error);
        });
        return (
            <div>
                <img className="Map" src="http://via.placeholder.com/1170x600" alt="Map Placeholder"/>
            </div>
        );
    }
}

export default MapFiller;