const request = require("request");


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=9752dca15bb3e53ecab36b7a9e6e0e50`
    
      request({url: url, json: true}, (error, { body }) => {
        if(error) { 
          callback("Unable to connect to the weather api", undefined)
        }else if(body.message) {
          callback("Unable to find location", undefined)
        }else {
          callback(undefined, `${body.weather[0].description}. The temperature feels like ${body.main.feels_like} but it is ${body.main.temp_max} degrees celcius. There is ${body.main.humidity}% of rain fall. The wind is ${body.wind.deg} degrees and moving at ${body.wind.speed}m/s`);
        }
      })
    }

    module.exports = forecast;
    