const Client = require("@googlemaps/google-maps-services-js").Client;
const client = new Client({});

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_SEARCH_DEFAULT_TIMEOUT = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_TIMEOUT;
const GOOGLE_MAPS_SEARCH_DEFAULT_RADIUS = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_RADIUS;

async function getPlace(latLong, keyword, type){
    const result = await client.placesNearby({
            params: {
                key: GOOGLE_MAPS_API_KEY,
                location: latLong,
                keyword: keyword,
                type: type,
                radius: GOOGLE_MAPS_SEARCH_DEFAULT_RADIUS,
            },
            timeout: GOOGLE_MAPS_SEARCH_DEFAULT_TIMEOUT
        });

    return result.data.results;
}

module.exports.getPlace = getPlace;