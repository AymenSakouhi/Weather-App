const request = require('request');

let geocodeAddress  = (address) => {
    return new Promise(((resolve, reject) => {
            let encodedAddress= encodeURIComponent(address);
            request({
                // url:`http://open.mapquestapi.com/geocoding/v1/address?key=lGLu4sJIgRWxIopEYphibw3lGXz4yGJI&location=${address}`,
                url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDl1eA9UaGQxCSSfKvwK0B45Gtazkj57ic`,
                json: true
            }, (error, response, body) => {
                if (error){
                    reject("unable to connect to google servers");
                } else if (body.status === "ZERO_RESULTS") {
                    reject("unable to find that address");
                } else if (body.status === "OK"){
                    resolve({
                        address: body.results[0].formatted_address,
                        latitude: body.results[0].geometry.location.lat,
                        longitude: body.results[0].geometry.location.lng
                    });
                }
            });
        }
    ))
};

geocodeAddress('Fouchana').then((location)=> {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});