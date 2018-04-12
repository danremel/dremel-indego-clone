import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: [],
            temp: [],
            description: []
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get("https://api.openweathermap.org/data/2.5/weather?id=4560349&units=imperial&APPID=93efc44bf2f6eb3308306f24dfd24128")
        .then(function(response) {
            _this.setState({ 
                weather: response.data,
                temp: response.data.main.temp,
                description: response.data.weather[0].description    
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    render() {
        return (
            <div className="weatherBlock">
                <div className="weatherInfo">
                    <h4>Current Weather:</h4>
                    <p>{this.state.temp}&deg;F</p>
                    <p>{this.state.description}</p>
                </div>
            </div>
        );
    }
}

export default Weather;