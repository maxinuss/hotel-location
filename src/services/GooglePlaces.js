const Client = require("@googlemaps/google-maps-services-js").Client;
const client = new Client({});

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_SEARCH_DEFAULT_TIMEOUT = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_TIMEOUT;
const GOOGLE_MAPS_SEARCH_DEFAULT_RADIUS = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_RADIUS;
const GOOGLE_MAPS_SEARCH_DEFAULT_KEYWORD = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_KEYWORD;
const GOOGLE_MAPS_SEARCH_DEFAULT_TYPE = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_TYPE;

async function getPlace(latLong){
    const result = await client.placesNearby({
            params: {
                key: GOOGLE_MAPS_API_KEY,
                location: latLong,
                keyword: GOOGLE_MAPS_SEARCH_DEFAULT_KEYWORD,
                type: GOOGLE_MAPS_SEARCH_DEFAULT_TYPE,
                radius: parseInt(GOOGLE_MAPS_SEARCH_DEFAULT_RADIUS),
            },
            timeout: parseInt(GOOGLE_MAPS_SEARCH_DEFAULT_TIMEOUT)
        });

    return result.data.results;
}

async function getFormattedPlace(latLong){
    const data = await getPlace(latLong);
    let results = [];

    for (let hotel of data) {
        results.push({
            id: hotel.place_id,
            name: hotel.name,
            rating: hotel.rating,
            vicinity: hotel.vicinity,
            latLong: `${hotel.geometry.location.lat}, ${hotel.geometry.location.lng}`
        })
    }

    return results;
}

module.exports.getFormattedPlace = getFormattedPlace;