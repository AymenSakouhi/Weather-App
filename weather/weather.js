
const request = require('request');

let getWeather = (latitude, longitude, callback) => {
    request({
            url :`https://api.darksky.net/forecast/7389f9d0bc000388f8a5bc5e8a76391d/${latitude},${longitude}`,
            json: true
        },
        (error,response,body) => {
            if ( !error && response.statusCode === 200){
                callback(undefined,{
                    temperature : body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                //`The real temperature is: ${body.currently.temperature} but it feels like: ${body.currently.apparentTemperature}.`
            });
            } else
                callback("unable to fetch the weather");
        }
    );
};


module.exports.getWeather = getWeather;



