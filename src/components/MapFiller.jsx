import React, { Component } from 'react';

const json = require('../data/indego.json');

class MapFiller extends Component {
    render() {
        const listedInfo = json.features.map((entry) =>
            <ul>
                <li key={entry}>
                    <p>{entry.properties.addressStreet}</p>
                    <p>{entry.properties.addressCity}, {entry.properties.addressState}</p>
                </li>
            </ul>
        );

        return (
            <div>
                <img className="Map" src="http://via.placeholder.com/1170x600" alt="Map Placeholder"/>

                <h3>Station Addresses</h3>
                <div className="JSON-info">
                    {listedInfo}
                </div>
            </div>
        );
    }
}

export default MapFiller;