const Client = require("@googlemaps/google-maps-services-js").Client;
const client = new Client({});

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_SEARCH_DEFAULT_TIMEOUT = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_TIMEOUT;
const GOOGLE_MAPS_SEARCH_DEFAULT_RADIUS = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_RADIUS;
const GOOGLE_MAPS_SEARCH_DEFAULT_KEYWORD = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_KEYWORD;
const GOOGLE_MAPS_SEARCH_DEFAULT_TYPE = process.env.GOOGLE_MAPS_SEARCH_DEFAULT_TYPE;

/**
 *
 * @param latLong
 * @returns {Promise<PlacesNearbyResponseData>}
 */
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

    return result.data;
}

/**
 *
 * @param latLong
 * @returns {Promise<{success: boolean, message: string}|[]|{success: boolean, error: string}>}
 */
async function getFormattedPlace(latLong){
    const data = await getPlace(latLong);

    let results = [];

    if (data.results.length === 0 && data.error_message) {
        console.log(data.error_message);
        return { success: false, error: data.error_message };
    }

    if (data.results.length === 0) {
        return { success: true, message: "Please try with another location." };
    }

    for (let hotel of data.results) {
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