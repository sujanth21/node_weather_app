const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=84e996b343f7f6e3095a31c882a6831a&query=${lat},${long}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect weather service!", undefined);
    } else if (body.error) {
      callback(
        "Unable to find the location to get weather, Please check your location!",
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} degrees out, There is a ${body.current.precip}% chance of rain. Also it is feels like ${body.current.feelslike} degrees out there.`
      );
    }
  });
};

module.exports = forecast;
