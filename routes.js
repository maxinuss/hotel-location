const bodyParser = require('body-parser');
const googlePlaceService = require('./src/services/GooglePlaces');
const bookingModel = require('./src/models/Booking');

/**
 *
 * @param app
 * @param express
 * @param router
 */
function init(app, express, router) {
  app.use(bodyParser.json());
  app.use('/api/',  apiRoutes(router));

  app.use(express.static('public'));
}
/**
 *
 * @param router
 * @returns {*}
 */
function apiRoutes(router) {
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

    res.status(201).json(result);
  });


  router.get('/properties/:propertyId/bookings', async (req, res) => {
    const propertyId = req.params.propertyId;

    if (!parseInt(propertyId)) {
      res.status(400).json({ success: false, error: 'Please provide numeric property ID' });
    }

    const result = await bookingModel.getBooking(propertyId);

    if (result.error) {
      res.status(500).json(result);
    }

    res.status(200).json(result);
  });

  return router;
}

module.exports.init = init;