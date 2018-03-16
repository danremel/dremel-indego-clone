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

    componentDidMount() {
    var self = this;
    axios.get('https://www.rideindego.com/stations/json/')
        .then(function (response) {
            response.data.features.forEach(function (entry) {
                var info = entry.properties;
                console.log(info);
                self.setState({ coordinates: entry.geometry.coordinates, addressStreet: info.addressStreet, 
                    addressCity: info.addressCity, addressState: info.addressState, addressZipCode: info.addressZipCode, 
                    bikesAvailable: info.bikesAvailable, closeTime: info.closeTime, docksAvailable: info.docksAvailable,
                    eventEnd: info.eventEnd, eventStart: info.eventStart, isEventBased: info.isEventBased,
                    isVirtual: info.isVirtual, isVisible: info.isVisible, kioskId: info.kioskId, kioskPublicStatus: info.kioskPublicStatus,
                    kioskStatus: info.kioskStatus, name: info.name, notes: info.notes, openTime: info.openTime, publicText: info.publicText,
                    timeZone: info.timeZone, totalDocks: info.totalDocks, trikesAvailable: info.trikesAvailable, kioskConnectionStatus: info.kioskConnectionStatus,
                    kioskType: info.kioskType, latitude: info.latitude, longitude: info.longitude, hasGeofence: info.hasGeofence, type: entry.type
                });
                console.log(self.state);
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    };
    render() {
        var listedInfo = this.state;
        return (
            <div>
            <img className="Map" src="http://via.placeholder.com/1170x600" alt="Map Placeholder"/>

            <h3>Station Addresses</h3>
            <div className="JSON-info">
            <ul>
                <li>
                    <p>{listedInfo.coordinates}</p>
                    <p>{listedInfo.addressStreet}</p>
                    <p>{listedInfo.addressCity}, {listedInfo.addressState}</p>
                </li>
            </ul>
            </div>
        </div>
        );
    }
}

export default MapFiller;