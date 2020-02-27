const client = require('../db').db;

async function addBooking(property_id, user_id){
    const queryText = 'INSERT INTO ' +
        'booking (property_id, user_id, creation_datetime) ' +
        'VALUES ($1, $2, to_timestamp($3))' +
        'RETURNING id, property_id, user_id, creation_datetime';

    const creation_datetime = Date.now() / 1000.0;
    const values = [ property_id, user_id, creation_datetime];

    try {
        const res = await client.query(queryText, values);
        return { success: true, bookingData: {...res.rows[0]}};
    } catch (err) {
        console.log(err.stack);
        return { success: false, error: err.stack };
    }
}

module.exports.addBooking = addBooking;