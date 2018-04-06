const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'The address for which you want to check the weather.',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  var encAddress = encodeURIComponent(argv.a);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encAddress}&key=AIzaSyAxR4KBkA0aHeett8Ey6v1NJObXvLueie8`;

  axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error ('Unable to find that address.')
    }

    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/47e2c2de1bd810cf9460d5efbb9efe0a/${lat},${long}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response)=>{
    var temp = response.data.currently.temperature;
    var feels = response.data.currently.apparentTemperature;
    console.log(`It is currently ${temp} degrees but it actually feels like ${feels}.`);
  }).catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Could not connect to API servers.');
    } else {
      console.log(e.message);
    }
  })
