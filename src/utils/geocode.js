const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoieGF2aWVybWFsZG9uYWRvbnkiLCJhIjoiY2tlaTd3ZW5hMWRhcTJ4cG9yeTBvOXF6bSJ9.Qh-cnvvNRk3eMP3NCbzMKA`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('unable to connect', undefined);
		} else if (body.features.length === 0) {
			callback('unable to find loacation. Try another search', undefined);
		} else {
			callback(undefined, {
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
