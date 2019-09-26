const request = require('request');

const forecast = (lat, long, callback) => {

    const forecastUrl = `https://api.darksky.net/forecast/98f2aeb407606961f719730c136795e4/${long},${lat}`;

    request({
        url: forecastUrl,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const currentData = body.currently;

            callback(undefined, {
                forecastData: `${body.daily.data[0].summary} It is currently ${currentData.temperature} degrees out. There is a ${currentData.precipProbability}% chance of rain.
                Wind speed is ${currentData.windSpeed} MPH. Humidity is ${currentData.humidity}`
            })
        }
    });
};

module.exports = forecast;
