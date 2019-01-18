const request = require('request');


let geocodeAddress =(address, callback) => {
    let encodedAddress= encodeURIComponent(address);
    request({
        // url:`http://open.mapquestapi.com/geocoding/v1/address?key=lGLu4sJIgRWxIopEYphibw3lGXz4yGJI&location=${address}`,
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDl1eA9UaGQxCSSfKvwK0B45Gtazkj57ic`,
        json: true
    }, (error, response, body) => {
        if (error){
            callback("unable to connect to google servers");
        } else if (body.status === "ZERO_RESULTS") {
            callback("unable to find that address");
        } else if (body.status === "OK"){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
            }
    });
};

module.exports.geocodeAddress = geocodeAddress;
