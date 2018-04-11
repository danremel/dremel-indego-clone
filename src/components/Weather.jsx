import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: []
        }
    }

    componentDidMount() {
        var _this = this;
        axios.get("http://api.openweathermap.org/data/2.5/weather?id=4560349&APPID=93efc44bf2f6eb3308306f24dfd24128")
        .then(function(response) {
            const weather = response.data.weather[0];
            _this.setState({ weather })
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    render() {
        // var currentWeather = this.state.weather.map((entry) =>
        //     <p>{entry.weather[0].main}</p>
        // );
        return (
            <div>
                <h3>Today's weather:</h3>
                <p>{this.state.weather.main}</p>
            </div>
        );
    }
}

export default Weather;