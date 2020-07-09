const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3VqYW50aCIsImEiOiJja2NiOGF1YjAwMjR3MnlvOW94NGg5Y3A0In0.0jVgylyk5WjOdc0qdQ9ZsQ&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect location service!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find the location, Please try another search!",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
