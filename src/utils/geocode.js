const request = require("request");

const geocode = (address,  callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXdveWFtIiwiYSI6ImNsOWcxenFnbzA1bnA0MXFydTV2eGU0d2oifQ.1DXw8bS-32KKXSoz08gFwg`
    request({url , json: true}, (error, { body }) => {
      if(error) {
        callback("Unable to connect to location service", undefined)
      }else if(body.features.length === 0) {
      callback("Unable to find location. Try another search!", undefined)
      }else {
        const longitude = body.features[0].center[0];
        const latitude= body.features[0].center[1];
        const location = body.features[0].place_name;
        const latlong = { latitude,longitude,location }
        callback(undefined, latlong);
      }
    })
  }


  module.exports = geocode;