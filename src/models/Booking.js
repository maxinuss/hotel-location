const client = require('../db').db;

/**
 *
 * @param property_id
 * @param user_id
 * @returns {Promise<{success: boolean, error: *}|{data: *, success: boolean}>}
 */
module.exports.addBooking = async function addBooking(property_id, user_id){
    const queryText = 'INSERT INTO ' +
        'booking (property_id, user_id, creation_datetime) ' +
        'VALUES ($1, $2, to_timestamp($3))' +
        'RETURNING id, property_id, user_id, creation_datetime';

    const creation_datetime = Date.now() / 1000.0;
    const values = [property_id, user_id, creation_datetime];

    try {
        const res = await client.query(queryText, values);
        return { success: true, data: res.rows[0]};
    } catch (err) {
        return { success: false, error: err.stack };
    }
}

/**
 *
 * @param property_id
 * @returns {Promise<{success: boolean, error: *}|{success: boolean, bookingData: *}>}
 */
module.exports.getBooking = async function getBooking(property_id){
    const queryText = 'SELECT * FROM booking WHERE property_id = $1';
    const values = [property_id];

    try {
        const res = await client.query(queryText, values);
        return { success: true, data: res.rows };
    } catch (err) {
        return { success: false, error: err.stack };
    }
}
