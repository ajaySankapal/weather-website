// http request
const request = require("postman-request");
// const url =
//   "http://api.weatherstack.com/current?access_key=b7081576e6ba5b480ee272baac19ff8b&query=23.2599,-77.4126";

// request({ url: url, json: true }, (error, response) => {
//   const forecast = response.body.current.weather_descriptions[0];
//   const temperature = response.body.current.temperature;
//   const feelsLike = response.body.current.feelslike;
//   console.log(
//     `${forecast}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees`
//   );
// });

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b7081576e6ba5b480ee272baac19ff8b&query=${address}`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("error connecting to the server", undefined);
    } else if (body.error) {
      callback("location not found! Try different search", undefined);
    } else {
      const forecast = body.current.weather_descriptions[0];
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const address = body.location.name;
      const location = `${body.location.name}, ${body.location.region}, ${body.location.country}`;
      const humidity = body.current.humidity;
      callback(undefined, {
        forecast: `${forecast}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees. The humidity is ${humidity}%`,
        location,
        address,
      });
    }
  });
};
module.exports = forecast;
