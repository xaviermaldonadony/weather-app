const request = require('request');
const apiKey = '1624e0b68ae2d6a237307b89274372bd';

const forecast = (lat, lon, callback) => {
	const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('unable to connect to weather service', undefined);
		} else if (body.cod === 401 || body.cod === '400') {
			callback('unable to find loacation. Try another search', undefined);
		} else {
			callback(undefined, {
				temp: body.main.temp,
				feelsLike: body.main.feels_like,
				tempMin: body.main.temp_min,
				tempMax: body.main.temp_max,
				humidity: body.main.humidity,
				name: body.name,
			});
		}
	});
};

module.exports = forecast;
