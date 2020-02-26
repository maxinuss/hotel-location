const bodyParser = require('body-parser');
const googlePlace = require('./src/models/GooglePlace');

function init(app, router) {
  app.use(bodyParser.json());
  routes(router);

  app.use('/api/', router);
}

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
    const result = await googlePlace.getFormattedPlace(
        latLong
    );

    res.status(200).json(result);
  });

  return router;
}

module.exports.init = init;