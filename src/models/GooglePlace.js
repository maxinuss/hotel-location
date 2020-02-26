const Client = require("@googlemaps/google-maps-services-js").Client;
const client = new Client({});

async function getPlace(latLong, keyword, type){
    const result = await client.placesNearby({
            params: {
                key: process.env.GOOGLE_MAPS_API_KEY,
                location: latLong,
                keyword: keyword,
                type: type,
                radius: 300,
            },
            timeout: 5000 // milliseconds
        });

    return result.data.results;
}

module.exports.getPlace = getPlace;