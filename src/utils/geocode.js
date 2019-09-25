const request = require('request');

const geocode = (address, callback) => {
    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamR6YWhydCIsImEiOiJjazB1MW01cXcwamY4M2hwZHNnOXkxaGxiIn0.cWFHp7kiL0DDDP-UxmwG8Q&limit=1`;

    request({
        url: geoCodeUrl,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found. Please try another location', undefined)
        } else {
            callback(undefined,
                {
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                });
        }
    })
};

module.exports = geocode;
