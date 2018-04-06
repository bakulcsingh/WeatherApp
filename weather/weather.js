const request = require('request');

var getWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/47e2c2de1bd810cf9460d5efbb9efe0a/${lat},${long}`,
    json: true
  },(error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        feels: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
};


module.exports = {
  getWeather
};
