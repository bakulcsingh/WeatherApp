const request = require('request');

var geocodeAddress = (address, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAxR4KBkA0aHeett8Ey6v1NJObXvLueie8`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Something went wrong.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find requested address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};
