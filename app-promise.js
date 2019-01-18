const request = require('request');
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            description: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

let encodedAddress= encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDl1eA9UaGQxCSSfKvwK0B45Gtazkj57ic`;

axios.get(geocodeUrl).then( (response)=> {
  if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find that address.');
  }
    console.log(response.data.results[0].formatted_address);
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/7389f9d0bc000388f8a5bc5e8a76391d/${lat},${lng}`;
    return axios.get(weatherUrl);
}).then( (response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`The real temperature is: ${temperature} but it feels like: ${apparentTemperature}.`)
}).catch((e) => {
        if (e.code === 'ENOTEFOUND'){
            console.log("unable to connect to API SERVERS");
        } else{
            console.log(e.message);
        }
});


