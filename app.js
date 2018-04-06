const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

geocode.geocodeAddress(encodeURIComponent(argv.a), (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude,results.longitude, (errorLog,output) => {
      if (errorLog) {
        console.log(errorLog);
      } else {
        console.log(`It is currently ${output.temperature} degrees but feels like ${output.feels}.`);
      }
    });
  }
});
