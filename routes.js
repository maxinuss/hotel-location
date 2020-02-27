const bodyParser = require('body-parser');
const googlePlaceService = require('./src/services/GooglePlaces');
const bookingModel = require('./src/models/Booking');

/**
 *
 * @param app
 * @param router
 */
function init(app, router) {
  app.use(bodyParser.json());
  routes(router);

  app.use('/api/', router);
}

/**
 *
 * @param router
 * @returns {*}
 */
function routes(router) {
  router.get('/health-check', async (req, res) => {
    const result = {
      status: 'OK',
      timestamp: Date.now()
    };

    res.status(200).json(result);
  });


  router.get('/properties', async (req, res) => {
    const latLong = req.query.at;
    const result = await googlePlaceService.getFormattedPlace(latLong);

    if (result.error) {
      res.status(401).json(result);
    }

    res.status(200).json(result);
  });


  router.post('/bookings', async (req, res) => {
    const userId = req.body.userId;
    const propertyId = req.body.propertyId;
    const result = await bookingModel.addBooking(propertyId, userId);

    if (result.error) {
      res.status(500).json(result);
    }

    res.status(200).json(result);
  });


  router.get('/properties/:propertyId/bookings', async (req, res) => {
    const propertyId = req.params.propertyId;
    const result = await bookingModel.getBooking(propertyId);

    if (result.error) {
      res.status(500).json(result);
    }

    res.status(200).json(result);
  });


  return router;
}

module.exports.init = init;