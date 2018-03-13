import React, { Component } from 'react';

var json = require('../data/indego.json');

class mapFiller extends Component {
    render() {
        return (
            <div>
                <img className="Map" src="http://via.placeholder.com/1170x600" alt="Map Placeholder"/>

                <div className="JSON-info">
                    <p>{json.features[0]}</p>
                </div>
            </div>
        );
    }
}

export default mapFiller;